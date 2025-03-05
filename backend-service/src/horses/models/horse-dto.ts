import { OmitType } from '@nestjs/swagger';
import { HorseEntity } from '../entities/horse.entity';

export class HorseDto extends OmitType(HorseEntity, [
  'isDeleted',
  'updatedAt',
  'createdAt',
  'owner',
] as const) {}
