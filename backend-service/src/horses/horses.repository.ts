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
/**
 * Repository class for managing HorseEntity instances.
 * Extends the base Repository class provided by TypeORM.
 */
export class HorsesRepository extends Repository<HorseEntity> {
  /**
   * Constructs a new HorsesRepository instance.
   * @param repository - The TypeORM repository for HorseEntity.
   */
  constructor(
    @InjectRepository(HorseEntity)
    private readonly repository: Repository<HorseEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  /**
   * Creates a new HorseEntity instance and saves it to the database.
   * @param createHorseDto - Data Transfer Object containing the details of the horse to be created.
   * @returns A promise that resolves to the created HorseEntity.
   */
  async createHorse(createHorseDto: CreateHorseDto): Promise<HorseEntity> {
    const horse = await this.create(
      plainToInstance(HorseEntity, createHorseDto),
    );
    return this.save(horse);
  }

  /**
   * Retrieves all HorseEntity instances that match the given filter criteria.
   * @param getAllHorseFilterDto - Data Transfer Object containing the filter criteria.
   * @returns A promise that resolves to an array of HorseEntity instances.
   */
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

  /**
   * Finds a HorseEntity instance by its ID.
   * @param id - The ID of the horse to find.
   * @returns A promise that resolves to the found HorseEntity.
   * @throws NotFoundException if no horse is found with the given ID.
   */
  async findById(id: string): Promise<HorseEntity> {
    const horse = await this.findOne({ where: { id } });

    if (!horse) {
      throw new NotFoundException(`Horse by ID ${id} not found`);
    }

    return horse;
  }

  /**
   * Updates an existing HorseEntity instance with new data.
   * @param id - The ID of the horse to update.
   * @param updateHorseDto - Data Transfer Object containing the updated details of the horse.
   * @returns A promise that resolves to the updated HorseEntity.
   */
  async updateHorse(
    id: string,
    updateHorseDto: UpdateHorseDto,
  ): Promise<HorseEntity> {
    const horse = await this.findById(id);

    Object.assign(horse, updateHorseDto);

    return this.save(horse);
  }

  /**
   * Deletes a HorseEntity instance by its ID.
   * @param id - The ID of the horse to delete.
   * @returns A promise that resolves when the horse is deleted.
   */
  async deleteHorse(id: string): Promise<void> {
    await this.findById(id);
    await this.delete(id);
  }

  /**
   * Updates the health status of a HorseEntity instance.
   * @param id - The ID of the horse to update.
   * @param changeStatusDto - Data Transfer Object containing the new health status.
   * @returns A promise that resolves to the updated HorseEntity.
   */
  async updateHealth(
    id: string,
    changeStatusDto: ChangeStatusDto,
  ): Promise<HorseEntity> {
    const horse = await this.findById(id);

    horse.healthStatus = changeStatusDto.healthStatus;
    return this.save(horse);
  }
}
