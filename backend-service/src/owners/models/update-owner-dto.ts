import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { CreateOwnerDto } from './create-owner-dto';

export class UpdateOwnerDto extends PartialType(CreateOwnerDto) {
  @ValidateIf((o) => Object.keys(o).length === 0)
  @IsNotEmpty({ message: 'At least one property must be provided' })
  dummyProperty?: string; // This acts as a validator trigger
}
