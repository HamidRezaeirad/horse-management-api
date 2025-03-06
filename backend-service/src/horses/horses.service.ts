import { Injectable } from '@nestjs/common';
import { OwnersService } from '../owners/owners.service';
import { HorsesRepository } from './horses.repository';
import { ChangeStatusDto } from './models/change-status-dto';
import { CreateHorseDto } from './models/create-horse-dto';
import { GetAllHorseFilterDto } from './models/getall-horse-filter-dto';
import { HorseDto } from './models/horse-dto';
import { UpdateHorseDto } from './models/update-horse-dto';

@Injectable()
/**
 * Service responsible for managing horse-related operations.
 */
export class HorsesService {
  /**
   * Constructs a new instance of HorsesService.
   * @param horsesRepository - Repository for horse data operations.
   * @param ownersService - Service for owner-related operations.
   */
  constructor(
    private horsesRepository: HorsesRepository,
    private ownersService: OwnersService,
  ) {}

  /**
   * Creates a new horse.
   * @param createHorseDto - Data Transfer Object containing horse creation details.
   * @returns A promise that resolves to the created horse's data.
   */
  async createHorse(createHorseDto: CreateHorseDto): Promise<HorseDto> {
    await this.ownersService.isOwnerExistById(createHorseDto.owner);
    return await this.horsesRepository.createHorse(createHorseDto);
  }

  /**
   * Retrieves all horses based on the provided filter criteria.
   * @param getAllHorseFilterDto - Data Transfer Object containing filter criteria.
   * @returns A promise that resolves to an array of horse data.
   */
  async getAll(
    getAllHorseFilterDto: GetAllHorseFilterDto,
  ): Promise<HorseDto[]> {
    return this.horsesRepository.getAll(getAllHorseFilterDto);
  }

  /**
   * Retrieves a horse by its ID.
   * @param id - The ID of the horse to retrieve.
   * @returns A promise that resolves to the horse's data.
   */
  async getById(id: string): Promise<HorseDto> {
    return this.horsesRepository.findById(id);
  }

  /**
   * Updates a horse's details.
   * @param id - The ID of the horse to update.
   * @param updateHorseDto - Data Transfer Object containing updated horse details.
   * @returns A promise that resolves to the updated horse's data.
   */
  async updateHorse(
    id: string,
    updateHorseDto: UpdateHorseDto,
  ): Promise<HorseDto> {
    return this.horsesRepository.updateHorse(id, updateHorseDto);
  }

  /**
   * Deletes a horse by its ID.
   * @param id - The ID of the horse to delete.
   * @returns A promise that resolves when the horse is deleted.
   */
  async deleteHorse(id: string): Promise<void> {
    return this.horsesRepository.deleteHorse(id);
  }

  /**
   * Updates a horse's health status.
   * @param id - The ID of the horse to update.
   * @param changeStatusDto - Data Transfer Object containing the new health status.
   * @returns A promise that resolves to the updated horse's data.
   */
  async updateHealth(
    id: string,
    changeStatusDto: ChangeStatusDto,
  ): Promise<HorseDto> {
    return this.horsesRepository.updateHealth(id, changeStatusDto);
  }
}
