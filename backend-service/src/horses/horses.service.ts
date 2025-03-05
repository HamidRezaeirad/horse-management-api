import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { OwnersService } from '../owners/owners.service';
import { HorsesRepository } from './horses.repository';
import { ChangeStatusDto } from './models/change-status-dto';
import { CreateHorseDto } from './models/create-horse-dto';
import { GetAllHorseFilterDto } from './models/getall-horse-filter-dto';
import { HorseDto } from './models/horse-dto';
import { UpdateHorseDto } from './models/update-horse-dto';

@Injectable()
export class HorsesService {
  constructor(
    private horsesRepository: HorsesRepository,
    private ownersService: OwnersService,
  ) {}

  async createHourse(createHorseDto: CreateHorseDto): Promise<HorseDto> {
    await this.ownersService.isOwnerExistById(createHorseDto.owner);

    return await this.horsesRepository.createHourse(createHorseDto);
  }

  async getAll(
    getAllHorseFilterDto: GetAllHorseFilterDto,
  ): Promise<HorseDto[]> {
    return this.horsesRepository.getAll(getAllHorseFilterDto);
  }

  async getById(id: string): Promise<HorseDto> {
    return this.horsesRepository.findById(id);
  }

  async updateHorse(
    id: string,
    updateHorseDto: UpdateHorseDto,
  ): Promise<HorseDto> {
    return this.horsesRepository.updateHorse(id, updateHorseDto);
  }

  async deleteHorse(id: string): Promise<DeleteResult> {
    return this.horsesRepository.deleteHorse(id);
  }

  async updateHealth(
    id: string,
    changeStatusDto: ChangeStatusDto,
  ): Promise<HorseDto> {
    return this.horsesRepository.updateHealth(id, changeStatusDto);
  }
}
