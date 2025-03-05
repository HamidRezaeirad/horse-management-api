import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { HealthStatus } from '../../common/enums/healthStatus.enum';

export class ChangeStatusDto {
  @ApiProperty({
    example: 'Healthy',
    description: 'The health status of the horse',
  })
  @IsEnum(HealthStatus, {
    message:
      'Invalid status. Valid statuses are: ' +
      Object.values(HealthStatus).join(', '),
  })
  healthStatus: HealthStatus;
}
