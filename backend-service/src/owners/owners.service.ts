import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './models/create-owner-dto';
import { OwnerDto } from './models/owner-dto';
import { UpdateOwnerDto } from './models/update-owner-dto';
import { OwnersRepository } from './owners.repository';

@Injectable()
/**
 * Service class for managing owners.
 */
export class OwnersService {
  /**
   * Constructs an instance of OwnersService.
   * @param ownersRepository - The repository used for owner data operations.
   */
  constructor(private ownersRepository: OwnersRepository) {}

  /**
   * Creates a new owner.
   * @param createOwnerDto - The data transfer object containing owner details.
   * @returns A promise that resolves to the created owner.
   */
  async createOwner(createOwnerDto: CreateOwnerDto): Promise<OwnerDto> {
    return await this.ownersRepository.createOwner(createOwnerDto);
  }

  /**
   * Retrieves all owners.
   * @returns A promise that resolves to an array of owners.
   */
  getAll(): Promise<OwnerDto[]> {
    return this.ownersRepository.getAll();
  }

  /**
   * Retrieves an owner by their ID.
   * @param id - The ID of the owner to retrieve.
   * @returns A promise that resolves to the owner with the specified ID.
   */
  getbyId(id: string): Promise<OwnerDto> {
    return this.ownersRepository.findById(id);
  }

  /**
   * Checks if an owner exists by their ID.
   * @param id - The ID of the owner to check.
   * @returns A promise that resolves to the owner if they exist, otherwise null.
   */
  isOwnerExistById(id: string): Promise<OwnerDto> {
    return this.ownersRepository.findById(id);
  }

  /**
   * Updates an existing owner.
   * @param id - The ID of the owner to update.
   * @param updateOwnerDto - The data transfer object containing updated owner details.
   * @returns A promise that resolves to the updated owner.
   */
  updateOwner(id: string, updateOwnerDto: UpdateOwnerDto): Promise<OwnerDto> {
    return this.ownersRepository.updateOwner(id, updateOwnerDto);
  }

  /**
   * Deletes an owner by their ID.
   * @param id - The ID of the owner to delete.
   * @returns A promise that resolves when the owner is deleted.
   */
  deleteOwner(id: string): Promise<void> {
    return this.ownersRepository.deleteOwner(id);
  }
}
