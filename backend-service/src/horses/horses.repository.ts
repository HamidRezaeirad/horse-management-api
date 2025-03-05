import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { HorseEntity } from './entities/horse.entity';
import { ChangeStatusDto } from './models/change-status-dto';
import { CreateHorseDto } from './models/create-horse-dto';
import { GetAllHorseFilterDto } from './models/getall-horse-filter-dto';
import { UpdateHorseDto } from './models/update-horse-dto';

@Injectable()
export class HorsesRepository extends Repository<HorseEntity> {
  constructor(
    @InjectRepository(HorseEntity)
    private readonly repository: Repository<HorseEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createHourse(createHorseDto: CreateHorseDto): Promise<HorseEntity> {
    const horse = await this.create(
      plainToInstance(HorseEntity, createHorseDto),
    );
    return this.save(horse);
  }

  async getAll(
    getAllHorseFilterDto: GetAllHorseFilterDto,
  ): Promise<HorseEntity[]> {
    const { healthStatus, breed, age } = getAllHorseFilterDto;

    const query = this.createQueryBuilder('horse').select([
      'horse.id',
      'horse.name',
      'horse.age',
      'horse.breed',
      'horse.healthStatus',
    ]);

    if (healthStatus) {
      query.andWhere('horse.healthStatus = :healthStatus', { healthStatus });
    }

    if (breed) {
      query.andWhere('horse.breed = :breed', { breed });
    }

    if (age) {
      query.andWhere('horse.age = :age', { age });
    }

    return await query.getMany();
  }

  async findById(id: string): Promise<HorseEntity> {
    const horse = await this.findOne({ where: { id } });

    if (!horse) {
      throw new NotFoundException(`Horse by ID ${id} not found`);
    }

    return horse;
  }

  async updateHorse(
    id: string,
    updateHorseDto: UpdateHorseDto,
  ): Promise<HorseEntity> {
    const horse = await this.findById(id);

    Object.assign(horse, updateHorseDto);

    return this.save(horse);
  }

  async deleteHorse(id: string): Promise<void> {
    await this.findById(id);
    await this.delete(id);
  }

  async updateHealth(
    id: string,
    changeStatusDto: ChangeStatusDto,
  ): Promise<HorseEntity> {
    const horse = await this.findById(id);

    horse.healthStatus = changeStatusDto.healthStatus;
    return this.save(horse);
  }
}
