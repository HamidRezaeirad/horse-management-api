import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './models/create-owner-dto';
import { OwnerDto } from './models/owner-dto';
import { UpdateOwnerDto } from './models/update-owner-dto';
import { OwnersRepository } from './owners.repository';

@Injectable()
export class OwnersService {
  constructor(private ownersRepository: OwnersRepository) {}

  async createOwner(createOwnerDto: CreateOwnerDto): Promise<OwnerDto> {
    return await this.ownersRepository.createOwner(createOwnerDto);
  }

  getAll(): Promise<OwnerDto[]> {
    return this.ownersRepository.getAll();
  }

  getbyId(id: string): Promise<OwnerDto> {
    return this.ownersRepository.findById(id);
  }

  isOwnerExistById(id: string): Promise<OwnerDto> {
    return this.ownersRepository.findById(id);
  }

  updateOwner(id: string, updateOwnerDto: UpdateOwnerDto): Promise<OwnerDto> {
    return this.ownersRepository.updateOwner(id, updateOwnerDto);
  }

  deleteOwner(id: string): Promise<void> {
    return this.ownersRepository.deleteOwner(id);
  }
}
