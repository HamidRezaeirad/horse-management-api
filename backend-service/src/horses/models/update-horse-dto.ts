import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { CreateHorseDto } from './create-horse-dto';

export class UpdateHorseDto extends PartialType(CreateHorseDto) {
  @ValidateIf((o) => Object.keys(o).length === 0)
  @IsNotEmpty({ message: 'At least one property must be provided' })
  dummyProperty?: string; // This acts as a validator trigger
}
