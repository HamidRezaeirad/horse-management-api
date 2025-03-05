import { OmitType } from '@nestjs/swagger';
import { OwnerEntity } from '../entities/owner.entity';

export class OwnerDto extends OmitType(OwnerEntity, [
  'isDeleted',
  'updatedAt',
  'createdAt',
  'horses',
] as const) {}
