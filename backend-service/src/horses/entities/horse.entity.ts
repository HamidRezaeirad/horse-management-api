import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { HealthStatus } from '../../common/enums/healthStatus.enum';
import { BaseEntity } from '../../common/shared/base.entity';
import { OwnerEntity } from '../../owners/entities/owner.entity';

/**
 * Represents a horse entity in the horse management system.
 *
 * @extends BaseEntity
 */
@Entity()
export class HorseEntity extends BaseEntity {
  /**
   * The name of the horse.
   *
   * @example 'Horse name'
   */
  @ApiProperty({ example: 'Horse name', description: 'The name of the horse' })
  @Column()
  name: string;

  /**
   * The age of the horse.
   *
   * @example 10
   */
  @ApiProperty({ example: 10, description: 'The age of the horse' })
  @Column()
  age: number;

  /**
   * The breed of the horse.
   *
   * @example 'Horse breed'
   */
  @ApiProperty({
    example: 'Horse breed',
    description: 'The breed of the horse',
  })
  @Column()
  breed: string;

  /**
   * The health status of the horse.
   *
   * @example 'Horse health status'
   * @enum {HealthStatus}
   */
  @ApiProperty({
    example: 'Horse health status',
    description: 'The status of the horse health',
    enum: HealthStatus,
  })
  @Column({ type: 'enum', enum: HealthStatus, default: HealthStatus.Healthy })
  healthStatus: HealthStatus;

  /**
   * The owner of the horse.
   *
   * @type {OwnerEntity}
   */
  @ManyToOne(() => OwnerEntity, (owner) => owner.horses, {
    onDelete: 'CASCADE',
  })
  owner: OwnerEntity;
}
