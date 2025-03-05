import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { HealthStatus } from '../../common/enums/healthStatus.enum';

export class CreateHorseDto {
  @ApiProperty({ example: 'Horse name', description: 'The name of the horse' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Horse breed',
    description: 'The breed of the horse',
  })
  @IsString()
  @IsNotEmpty()
  breed: string;

  @ApiProperty({ example: 10, description: 'The age of the horse' })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({
    example: 'Healthy',
    description: 'The health status of the horse',
    enum: HealthStatus,
  })
  @IsEnum(HealthStatus, {
    message:
      'Invalid status. Valid statuses are: ' +
      Object.values(HealthStatus).join(', '),
  })
  healthStatus: HealthStatus;

  @ApiProperty({
    example: 'Owner Id',
    description: 'The ID of the owner',
  })
  @IsNotEmpty()
  @IsString()
  owner: string;
}
