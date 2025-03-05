import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * BaseEntity is an abstract base class for entities. All entities in application can extend this class and use the benefit of pre-defined columns.
 *
 * @property id: string(uuid)
 * @property createDateTime: datetime(default: current)
 * @property updateDateColumn: datetime(default: current)
 * @property isDeleted: boolean
 */
export abstract class BaseEntity {
  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'The unique identifier for the entity',
  })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ApiProperty({
    example: '2024-02-12T10:00:00.000Z',
    description: 'The date and time when the company was created',
  })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  createdAt: Date;

  @ApiProperty({
    example: '2024-02-12T12:00:00.000Z',
    description: 'The date and time when the company was last updated',
  })
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  updatedAt: Date;

  @ApiProperty({
    example: false,
    description: 'Indicates whether the entity is deleted',
  })
  @Exclude()
  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
