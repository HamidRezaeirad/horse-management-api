import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/shared/base.entity';
import { HorseEntity } from '../../horses/entities/horse.entity';

@Entity()
/**
 * Represents an owner entity in the horse management system.
 * This entity contains information about the owner including their name, email, and associated horses.
 */
export class OwnerEntity extends BaseEntity {
  /**
   * The name of the owner.
   * @example 'John Doe'
   */
  @ApiProperty({ example: 'Owner name', description: 'The name of the owner' })
  @Column()
  name: string;

  /**
   * The email of the owner.
   * @example 'john.doe@example.com'
   */
  @ApiProperty({
    example: 'Owner email',
    description: 'The email of the owner',
  })
  @Column()
  email: string;

  /**
   * The list of horses associated with the owner.
   * This relationship is managed with cascading operations.
   */
  @OneToMany(() => HorseEntity, (horse) => horse.owner, {
    cascade: true,
  })
  @ApiProperty({
    example: 'Owner phone',
    description: 'The phone of the owner',
  })
  horses: HorseEntity[];
}
