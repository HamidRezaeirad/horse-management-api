import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { HealthStatus } from '../../common/enums/healthStatus.enum';

export class GetAllHorseFilterDto {
  @ApiProperty({
    example: 'Horse name',
    description: 'The name of the horse',
  })
  @IsString()
  @IsOptional()
  breed: string;

  @ApiProperty({ example: '10', description: 'The age of the horse' })
  @IsOptional()
  @IsString()
  age: string;

  @ApiProperty({
    example: 'Healthy',
    description: 'The health status of the horse',
  })
  @IsOptional()
  @IsEnum(HealthStatus, {
    message:
      'Invalid status. Valid health status are: ' +
      Object.values(HealthStatus).join(', '),
  })
  healthStatus: HealthStatus;
}
