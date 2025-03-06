import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { OwnerEntity } from './entities/owner.entity';
import { CreateOwnerDto } from './models/create-owner-dto';
import { UpdateOwnerDto } from './models/update-owner-dto';

@Injectable()
/**
 * Repository class for managing OwnerEntity instances.
 * Extends the base Repository class provided by TypeORM.
 */
export class OwnersRepository extends Repository<OwnerEntity> {
  /**
   * Constructs a new OwnersRepository instance.
   * @param repository - The injected repository for OwnerEntity.
   */
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly repository: Repository<OwnerEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  /**
   * Creates a new owner entity.
   * @param createOwnerDto - Data transfer object containing the details of the owner to be created.
   * @returns A promise that resolves to the created OwnerEntity.
   */
  async createOwner(createOwnerDto: CreateOwnerDto): Promise<OwnerEntity> {
    const owner = this.create(plainToInstance(OwnerEntity, createOwnerDto));
    return await this.save(owner);
  }

  /**
   * Retrieves all owner entities.
   * @returns A promise that resolves to an array of OwnerEntity instances.
   */
  async getAll(): Promise<OwnerEntity[]> {
    return await this.find();
  }

  /**
   * Finds an owner entity by its ID.
   * @param id - The ID of the owner to find.
   * @returns A promise that resolves to the found OwnerEntity.
   * @throws NotFoundException if no owner is found with the given ID.
   */
  async findById(id: string): Promise<OwnerEntity> {
    const owner = await this.findOne({ where: { id } });

    if (!owner) {
      throw new NotFoundException(`Owner by ID ${id} not found`);
    }

    return owner;
  }

  /**
   * Updates an existing owner entity.
   * @param id - The ID of the owner to update.
   * @param updateOwnerDto - Data transfer object containing the updated details of the owner.
   * @returns A promise that resolves to the updated OwnerEntity.
   */
  async updateOwner(
    id: string,
    updateOwnerDto: UpdateOwnerDto,
  ): Promise<OwnerEntity> {
    const owner = await this.findById(id);

    Object.assign(owner, updateOwnerDto);

    return await this.save(owner);
  }

  /**
   * Deletes an owner entity by its ID.
   * @param id - The ID of the owner to delete.
   * @returns A promise that resolves when the owner is deleted.
   * @throws NotFoundException if no owner is found with the given ID.
   */
  async deleteOwner(id: string): Promise<void> {
    const owner = await this.findOne({
      where: { id },
      relations: ['horses'],
    });

    if (!owner) {
      throw new NotFoundException(`Owner by ID ${id} not found`);
    }

    await this.repository.remove(owner);
  }
}
