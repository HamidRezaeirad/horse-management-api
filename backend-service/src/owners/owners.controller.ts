import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateOwnerDto } from './models/create-owner-dto';
import { OwnerDto } from './models/owner-dto';
import { UpdateOwnerDto } from './models/update-owner-dto';
import { OwnersService } from './owners.service';

/**
 * Controller for managing horse owners.
 *
 * This controller provides endpoints for creating, retrieving, updating, and deleting horse owners.
 * It uses role-based access control to restrict access to certain endpoints.
 */
@Controller('owners')
@UseGuards(RolesGuard)
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  /**
   * Creates a new owner.
   *
   * @param createOwnerDto - Data transfer object containing the details of the owner to be created.
   * @returns The created ownerDto.
   *
   * @post
   * @role admin
   * @ApiResponse { status: 201, type: OwnerDto }
   */
  @Post()
  @ApiResponse({ status: 201, type: CreateOwnerDto })
  @Roles('admin')
  async createOwner(@Body() createOwnerDto: CreateOwnerDto): Promise<OwnerDto> {
    return this.ownersService.createOwner(createOwnerDto);
  }

  /**
   * Retrieves all owners.
   *
   * @returns An array of ownerDto.
   *
   * @Get
   * @ApiResponse { status: 200, type: [CreateOwnerDto] }
   * @role admin, vet
   */
  @Get()
  @ApiResponse({ status: 200, type: [CreateOwnerDto] })
  @Roles('admin', 'vet')
  async getAll(): Promise<OwnerDto[]> {
    return this.ownersService.getAll();
  }

  /**
   * Retrieves an owner by ID.
   *
   * @param id - The ID of the owner to be retrieved.
   * @returns The ownerDto.
   *
   * @Get
   * @ApiResponse { status: 200, type: CreateOwnerDto }
   * @role admin, vet
   */
  @Get(':id')
  @ApiResponse({ status: 200, type: CreateOwnerDto })
  @Roles('admin', 'vet')
  async getbyId(@Param('id') id: string): Promise<OwnerDto> {
    return this.ownersService.getbyId(id);
  }

  /**
   * Updates an owner by ID.
   *
   * @param id - The ID of the owner to be updated.
   * @param updateOwnerDto - Data transfer object containing the updated details of the owner.
   * @returns The updated ownerDto.
   *
   * @Put
   * @ApiResponse { status: 200, type: CreateOwnerDto }
   * @role admin
   */
  @Put(':id')
  @ApiResponse({ status: 200, type: CreateOwnerDto })
  @Roles('admin')
  async updateOwner(
    @Param('id') id: string,
    @Body() updateOwnerDto: UpdateOwnerDto,
  ): Promise<OwnerDto> {
    return this.ownersService.updateOwner(id, updateOwnerDto);
  }

  /**
   * Deletes an owner by ID.
   *
   * @param id - The ID of the owner to be deleted.
   * @returns The result of the delete operation.
   *
   * @Delete
   * @ApiResponse { status: 204, type: null }
   * @role admin
   * @httpcode 204
   */
  @Delete(':id')
  @ApiResponse({ status: 204, type: null })
  @Roles('admin')
  @HttpCode(204)
  async deleteOwner(@Param('id') id: string): Promise<void> {
    await this.ownersService.deleteOwner(id);
  }
}
