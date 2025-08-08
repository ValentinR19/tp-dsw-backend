import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CustomerShipping } from '../models/classes/customer-shipping.entity';
import {CustomerShippingRepository,ListQuery,} from '../repositories/customer-shipping.repoository';

type CreatePayload = {
  customerId?: number;
  recipientFirstName?: string;
  recipientLastName?: string;
  recipientEmail?: string;      // <- en tu entity es "recipient_company_name"
  phoneNumber?: string;
  phoneAreaCode?: string;
  alias?: string;
  adress?: string;              // escrito así en tu entity
  number?: string | number;     // lo convierto a int
  complement?: string | number; // lo convierto a int
  postalCode?: string | number; // lo convierto a int
  deliveryInstructions?: string;
};

type UpdatePayload = Partial<CreatePayload>;

@Injectable()
export class CustomerShippingService {
  constructor(private readonly repository: CustomerShippingRepository) {}

  // -------- Helpers de validación --------
  private ensureString(v: any, field: string, max?: number): string {
    if (typeof v !== 'string') {
      throw new BadRequestException(`${field} es requerido y debe ser texto.`);
    }
    const normalized = this.repository.normalizeText(v);
    if (!normalized) throw new BadRequestException(`${field} no puede estar vacío.`);
    if (max && normalized.length > max) {
      throw new BadRequestException(`${field} no puede exceder ${max} caracteres.`);
    }
    return normalized;
  }

  private ensureOptionalString(v: any, field: string, max?: number): string | undefined {
    if (v === undefined || v === null) return undefined;
    if (typeof v !== 'string') {
      throw new BadRequestException(`${field} debe ser texto.`);
    }
    const normalized = this.repository.normalizeText(v);
    if (!normalized) return undefined;
    if (max && normalized.length > max) {
      throw new BadRequestException(`${field} no puede exceder ${max} caracteres.`);
    }
    return normalized;
  }

  private toIntOrThrow(v: any, field: string): number {
    if (v === undefined || v === null || v === '') {
      throw new BadRequestException(`${field} es requerido y debe ser numérico.`);
    }
    const n = typeof v === 'number' ? v : parseInt(String(v), 10);
    if (!Number.isInteger(n)) throw new BadRequestException(`${field} debe ser un entero.`);
    return n;
  }

  private toOptionalInt(v: any, field: string): number | undefined {
    if (v === undefined || v === null || v === '') return undefined;
    const n = typeof v === 'number' ? v : parseInt(String(v), 10);
    if (!Number.isInteger(n)) throw new BadRequestException(`${field} debe ser un entero.`);
    return n;
  }

  private validateBeforeCreate(dto: CreatePayload) {
    const customerId = this.toIntOrThrow(dto.customerId, 'customerId');

    const recipientFirstName = this.ensureString(dto.recipientFirstName, 'recipientFirstName', 255);
    const recipientLastName  = this.ensureString(dto.recipientLastName,  'recipientLastName',  255);
    // recipientEmail == company name en tu schema
    const recipientEmail     = this.ensureString(dto.recipientEmail, 'recipientEmail', 255);
    const phoneNumber        = this.ensureString(dto.phoneNumber, 'phoneNumber', 50);
    const phoneAreaCode      = this.ensureString(dto.phoneAreaCode, 'phoneAreaCode', 10);
    const alias              = this.ensureString(dto.alias, 'alias', 255);
    const adress             = this.ensureString(dto.adress, 'adress', 255);

    const number             = this.toIntOrThrow(dto.number, 'number');
    const complement         = this.toOptionalInt(dto.complement, 'complement'); // puede ser opcional, ajustá si no
    const postalCode         = this.toIntOrThrow(dto.postalCode, 'postalCode');

    const deliveryInstructions = this.ensureOptionalString(dto.deliveryInstructions, 'deliveryInstructions', 500);

    return {
      customerId,
      recipientFirstName,
      recipientLastName,
      recipientEmail,
      phoneNumber,
      phoneAreaCode,
      alias,
      adress,
      number,
      complement,
      postalCode,
      deliveryInstructions,
    };
  }

  private validateBeforeUpdate(current: CustomerShipping, dto: UpdatePayload) {
    // Partimos del registro actual y aplicamos transformaciones si llegan
    const next: Partial<CustomerShipping> = { ...current };

    if (dto.customerId !== undefined) next.customerId = this.toIntOrThrow(dto.customerId, 'customerId');

    if (dto.recipientFirstName !== undefined) next.recipientFirstName = this.ensureString(dto.recipientFirstName, 'recipientFirstName', 255);
    if (dto.recipientLastName  !== undefined) next.recipientLastName  = this.ensureString(dto.recipientLastName,  'recipientLastName',  255);
    if (dto.recipientEmail     !== undefined) next.recipientEmail     = this.ensureString(dto.recipientEmail,     'recipientEmail',     255); // company
    if (dto.phoneNumber        !== undefined) next.phoneNumber        = this.ensureString(dto.phoneNumber,        'phoneNumber',        50);
    if (dto.phoneAreaCode      !== undefined) next.phoneAreaCode      = this.ensureString(dto.phoneAreaCode,      'phoneAreaCode',      10);
    if (dto.alias              !== undefined) next.alias              = this.ensureString(dto.alias,              'alias',              255);
    if (dto.adress             !== undefined) next.adress             = this.ensureString(dto.adress,             'adress',             255);

    if (dto.number      !== undefined) next.number      = String(this.toIntOrThrow(dto.number, 'number'));
    if (dto.complement  !== undefined) {const comp = this.toOptionalInt(dto.complement, 'complement');
      next.complement = comp !== undefined ? String(comp) : undefined; }
    if (dto.postalCode  !== undefined) next.postalCode  = String(this.toIntOrThrow(dto.postalCode,  'postalCode'));

    if (dto.deliveryInstructions !== undefined) next.deliveryInstructions = this.ensureOptionalString(dto.deliveryInstructions, 'deliveryInstructions', 500);

    return next;
  }

  // -------- CRUD --------
  async create(body: CreatePayload) {
    const clean = this.validateBeforeCreate(body);
    const entity = this.repository.create({
      ...clean,
      number: String(clean.number),
      complement: clean.complement !== undefined ? String(clean.complement) : undefined,
      postalCode: String(clean.postalCode),
    });
    return this.repository.save(entity);
  }

  async findAll(q: ListQuery) {
    const { data, total } = await this.repository.findPaginated(q);
    const page = q.page ?? 1;
    const limit = q.limit ?? 10;
    return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  }

  async findOne(id: number, includeDeleted = false) {
    const item = await this.repository.findById(id, includeDeleted);
    if (!item) throw new NotFoundException(`CustomerShipping ${id} no encontrado`);
    return item;
  }

  async update(id: number, body: UpdatePayload) {
    const current = await this.findOne(id);
    const next = Object.assign(current, this.validateBeforeUpdate(current, body));
    return this.repository.save(next);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repository.softDeleteById(id);
    return { id, deleted: true };
  }

  async restore(id: number) {
    await this.repository.restoreById(id);
    return this.findOne(id);
  }
}
