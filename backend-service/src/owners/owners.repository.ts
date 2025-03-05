import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { OwnerEntity } from './entities/owner.entity';
import { CreateOwnerDto } from './models/create-owner-dto';
import { UpdateOwnerDto } from './models/update-owner-dto';

@Injectable()
export class OwnersRepository extends Repository<OwnerEntity> {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly repository: Repository<OwnerEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createOwner(createOwnerDto: CreateOwnerDto): Promise<OwnerEntity> {
    const owner = this.create(plainToInstance(OwnerEntity, createOwnerDto));
    return await this.save(owner);
  }

  async getAll(): Promise<OwnerEntity[]> {
    return await this.find();
  }

  async findById(id: string): Promise<OwnerEntity> {
    const owner = await this.findOne({ where: { id } });

    if (!owner) {
      throw new NotFoundException(`Owner by ID ${id} not found`);
    }

    return owner;
  }

  async updateOwner(
    id: string,
    updateOwnerDto: UpdateOwnerDto,
  ): Promise<OwnerEntity> {
    const owner = await this.findById(id);

    Object.assign(owner, updateOwnerDto);

    return await this.save(owner);
  }

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
