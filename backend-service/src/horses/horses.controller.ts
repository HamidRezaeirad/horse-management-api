import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { HorsesService } from './horses.service';
import { ChangeStatusDto } from './models/change-status-dto';
import { CreateHorseDto } from './models/create-horse-dto';
import { GetAllHorseFilterDto } from './models/getall-horse-filter-dto';
import { HorseDto } from './models/horse-dto';
import { UpdateHorseDto } from './models/update-horse-dto';

/**
 * Controller for managing horses.
 *
 * This controller provides endpoints for creating, retrieving, updating, and deleting horses.
 * It also includes an endpoint for updating the health status of a horse.
 *
 * @controller HorsesController
 * @useGuards RolesGuard
 */
@Controller('horses')
@UseGuards(RolesGuard)
export class HorsesController {
  constructor(private readonly horsesService: HorsesService) {}

  /**
   * Creates a new horse.
   *
   * @param createHorseDto - Data transfer object containing the details of the horse to be created.
   * @returns The created horse object.
   *
   * @post
   * @roles admin
   * @ApiResponse { status: 201, type: HorseDto }
   */

  @Post()
  @ApiResponse({ status: 201, type: HorseDto })
  @Roles('admin')
  async createHourse(
    @Body() createHorseDto: CreateHorseDto,
  ): Promise<HorseDto> {
    return this.horsesService.createHourse(createHorseDto);
  }

  /**
   * Retrieves all horses based on the provided filter.
   *
   * @param getAllHorseFilterDto - Data transfer object containing the filter criteria.
   * @returns A list of horses matching the filter criteria.
   *
   * @get
   * @roles admin, vet
   * @ApiResponse { status: 200, type: [HorseDto] }
   */
  @Get()
  @ApiResponse({ status: 200, type: [HorseDto] })
  @Roles('admin', 'vet')
  async getAll(
    @Query() getAllHorseFilterDto: GetAllHorseFilterDto,
  ): Promise<HorseDto[]> {
    return this.horsesService.getAll(getAllHorseFilterDto);
  }

  /**
   * Retrieves a horse by its ID.
   *
   * @param id - The ID of the horse to retrieve.
   * @returns The horse with the specified ID.
   *
   * @get
   * @roles admin, vet
   * @ApiResponse { status: 200, type: HorseDto }
   */
  @Get(':id')
  @ApiResponse({ status: 200, type: HorseDto })
  @Roles('admin', 'vet')
  async getById(@Param('id') id: string): Promise<HorseDto> {
    return this.horsesService.getById(id);
  }

  /**
   * Updates a horse by its ID.
   *
   * @param id - The ID of the horse to update.
   * @param updateHorseDto - Data transfer object containing the updated details of the horse.
   * @returns The updated horse object.
   *
   * @put
   * @roles admin
   * @ApiResponse { status: 200, type: HorseDto }
   */
  @Put(':id')
  @ApiResponse({ status: 200, type: HorseDto })
  @Roles('admin')
  async updateHorse(
    @Param('id') id: string,
    @Body() updateHorseDto: UpdateHorseDto,
  ): Promise<HorseDto> {
    return this.horsesService.updateHorse(id, updateHorseDto);
  }

  /**
   * Deletes a horse by its ID.
   *
   * @param id - The ID of the horse to delete.
   * @returns The result 204 in case of success.
   *
   * @delete
   * @roles admin
   * @HttpCode 204
   * @ApiResponse { status: 204, type: null }
   */
  @Delete(':id')
  @ApiResponse({ status: 204, type: null })
  @Roles('admin')
  @HttpCode(204)
  async deleteHorse(@Param('id') id: string): Promise<void> {
    return this.horsesService.deleteHorse(id);
  }

  /**
   * Updates the health status of a horse by its ID.
   *
   * @param id - The ID of the horse to update.
   * @param changeStatusDto - Data transfer object containing the new health status of the horse.
   * @returns The updated horse.
   *
   * @patch
   * @roles vet
   * @ApiResponse { status: 200, type: HorseDto }
   */
  @Patch(':id/health')
  @ApiResponse({ status: 200, type: HorseDto })
  @Roles('vet')
  async updateHealth(
    @Param('id') id: string,
    @Body() changeStatusDto: ChangeStatusDto,
  ): Promise<HorseDto> {
    return this.horsesService.updateHealth(id, changeStatusDto);
  }
}
