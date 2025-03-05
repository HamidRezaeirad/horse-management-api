import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/shared/base.entity';
import { HorseEntity } from '../../horses/entities/horse.entity';

@Entity()
export class OwnerEntity extends BaseEntity {
  @ApiProperty({ example: 'Owner name', description: 'The name of the owner' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Owner email',
    description: 'The email of the owner',
  })
  @Column()
  email: string;

  @OneToMany(() => HorseEntity, (horse) => horse.owner)
  @ApiProperty({
    example: 'Owner phone',
    description: 'The phone of the owner',
  })
  horses: HorseEntity[];
}
