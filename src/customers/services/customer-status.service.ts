import {Injectable,NotFoundException,BadRequestException,ConflictException,} from '@nestjs/common';
import { CustomerStatus } from '../models/classes/customer-status.entity';
import {CustomerStatusRepository,ListQuery,} from '../repositories/customer-status.repository';

type CreatePayload = { name?: string; color?: string };
type UpdatePayload = { name?: string; color?: string };

@Injectable()
export class CustomerStatusService {
  constructor(private readonly repository: CustomerStatusRepository) {}

  private async validateBeforeSave(dto: CreatePayload, excludeId?: number) {
    if (!dto.name || typeof dto.name !== 'string') {
      throw new BadRequestException('El nombre es requerido.');
    }
    if (!dto.color || typeof dto.color !== 'string') {
      throw new BadRequestException('El color es requerido.');
    }

    const normalizedName = this.repository.normalizeName(dto.name);
    if (normalizedName.length === 0) throw new BadRequestException('El nombre no puede quedar vacío.');
    if (normalizedName.length > 20) throw new BadRequestException('El nombre no puede exceder 20 caracteres.');
    if (dto.color.trim().length === 0) throw new BadRequestException('El color no puede quedar vacío.');
    if (dto.color.trim().length > 20) throw new BadRequestException('El color no puede exceder 20 caracteres.');

    const exists = await this.repository.existsByNameInsensitive(normalizedName, excludeId, true);
    if (exists) throw new ConflictException(`Ya existe un estado con el nombre "${normalizedName}".`);

    return {
      name: normalizedName,
      color: dto.color.trim(),
    };
  }

  async create(body: CreatePayload) {
    const clean = await this.validateBeforeSave(body);
    const entity = this.repository.create(clean);
    try {
      return await this.repository.save(entity);
    } catch (err) {
      if (err?.code === 'duplicate-key') throw new ConflictException('El nombre ya está en uso.');
      throw err;
    }
  }

  async findAll(q: ListQuery) {
    const { data, total } = await this.repository.findPaginated(q);
    const page = q.page ?? 1;
    const limit = q.limit ?? 10;
    return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  }

  async findOne(id: number, includeDeleted = false) {
    const item = await this.repository.findById(id, includeDeleted);
    if (!item) throw new NotFoundException(`CustomerStatus ${id} no encontrado`);
    return item;
  }

  async update(id: number, body: UpdatePayload) {
    const current = await this.findOne(id);

    let next: CustomerStatus = { ...current };
    if (typeof body.name === 'string' || typeof body.color === 'string') {
      const clean = await this.validateBeforeSave(
        { name: body.name ?? current.name, color: body.color ?? current.color },
        id,
      );
      next = Object.assign(current, clean);
    }

    try {
      return await this.repository.save(next);
    } catch (err) {
      if (err?.code === 'duplicate-key') throw new ConflictException('El nombre ya está en uso.');
      throw err;
    }
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
