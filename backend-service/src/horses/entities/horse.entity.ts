import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { HealthStatus } from '../../common/enums/healthStatus.enum';
import { BaseEntity } from '../../common/shared/base.entity';
import { OwnerEntity } from '../../owners/entities/owner.entity';

@Entity()
export class HorseEntity extends BaseEntity {
  @ApiProperty({ example: 'Horse name', description: 'The name of the horse' })
  @Column()
  name: string;

  @ApiProperty({ example: 10, description: 'The age of the horse' })
  @Column()
  age: number;

  @ApiProperty({
    example: 'Horse breed',
    description: 'The breed of the horse',
  })
  @Column()
  breed: string;

  @ApiProperty({
    example: 'Horse health status',
    description: 'The status of the horse health',
    enum: HealthStatus,
  })
  @Column({ type: 'enum', enum: HealthStatus, default: HealthStatus.Healthy })
  healthStatus: HealthStatus;

  @ManyToOne(() => OwnerEntity, (owner) => owner.horses, {
    onDelete: 'CASCADE',
  })
  owner: OwnerEntity;
}
