import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CustomerCategory } from '../models/classes/customer-category.entity';
import { CustomerCategoryRepository, ListQuery } from '../repositories/customer-category.repository';

type CreatePayload = { name?: string; active?: boolean };
type UpdatePayload = { name?: string; active?: boolean };

@Injectable()
export class CustomerCategoryService {
  constructor(private readonly repository: CustomerCategoryRepository) {}

  // -------- Validaciones de negocio --------
  private async validateBeforeSave(dto: CreatePayload, excludeId?: number) {
    if (!dto.name || typeof dto.name !== 'string') {
      throw new BadRequestException('El nombre es requerido.');
    }

    const normalized = this.repository.normalizeName(dto.name);
    if (normalized.length === 0) throw new BadRequestException('El nombre no puede quedar vacío.');
    if (normalized.length > 20) throw new BadRequestException('Máximo 20 caracteres.');

    const exists = await this.repository.existsByNameInsensitive(normalized, excludeId, true);
    if (exists) throw new ConflictException(`Ya existe "${normalized}".`);

    return {
      name: normalized,
      active: typeof dto.active === 'boolean' ? dto.active : true,
    };
  }

  /* 
  :**+=-:...................................... ..............
.+%####*+-:...............................:---:.............
..-*##**##**+-:.......................-=*#%%%#+.............
....:+###**####*+==-:-::::........:-*#%%%#%%%*:.............
......:=*#######%%#####*++--::..=##%#####%%#=...............
.........:=*######%%%%%%%#*+=--*%##**#%%#*-:................
............:-+*###%%%%%%%%#*+#%%####*=:....................
..............-+####%%%##***+**###*=:.......................
.............=%#############***+++- ........................
.............:***####****#**#*+=+++:........................
..............=*+*#**+++++++====++++=-......................
............:=++==+==+++++++++++++++++=-....................
...........-==----::::-=--===++==========:..................
...........=+====-----=++-::-======+=====-..................
...........=**++++++====---:::-====+++==-...................
............*#*****+++==--====**=-=++=-.....................
............+####*****+++++*###+-===:.......................
.............::-+***+=--====#*=--===........................
................:+**+=+====++=--=+==........................
................-*****#*+++=--====++-:......................
...............:+*******++=--===++++++=:....................
.............:=+****++==----====++++*+++=:..................
...........:=******++===-----===++++++++++:.................
..........=+*******++===------==+++++++++++:.......:::::....
.........=*********++==------=++++*++++++++- .:-=*#%%%%##+:.
........:+*********+++===-===+**++++++++++++-=%+::-====--:..
........:***********++======+***+++++++++++****:..  ........
.........+**********++======+****+++++++*++*+++=:::.........
.........:*#*********+=======+*##*++*****++++++++*#*+=:.....
.......-*#########*****++++==++*##*******+++++++++####*-....
.......+#%#*########****++++==+*#******+++++++++++*#*+=.....
....... .:-**####%%####***+**#********++++=+++++++*=:.......
......::::-+######%%%%########******++++++===+++**+=-:.... .
.....:#%%%%%%%######%%%%%%###******++++++++++==+*#%%%#***+=-
......:+*##*=-=+=+*##%%%%##****##******+++=-:.....--=#%%%%#=
.............  .....:-+#***+++*+=====--::........... .-=-:..
................... .:**++++**#+:. .........................
...................-=*+++++*%%%##*:.........................
.................:*%##***##*#####*+.........................
.................+%###**+=-...:::...........................

 */

  // -------- CRUD --------
  async create(body: CreatePayload) {
    const clean = await this.validateBeforeSave(body);
    const entity = this.repository.create({
      ...clean,
      active: String(clean.active),
    });
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
    if (!item) throw new NotFoundException(`CustomerCategory ${id} no encontrada`);
    return item;
  }

  async update(id: number, body: UpdatePayload) {
    const current = await this.findOne(id);

    let next: CustomerCategory = { ...current };
    if (typeof body.name === 'string') {
      const clean = await this.validateBeforeSave({ name: body.name }, id); //ver somo solucionar esto del actiuve
      next = Object.assign(current, clean);
    } else if (typeof body.active === 'boolean') {
      next = Object.assign(current, { active: body.active });
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
