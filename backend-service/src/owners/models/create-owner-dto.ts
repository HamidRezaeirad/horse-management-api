import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateOwnerDto {
  @ApiProperty({ example: 'Owner name', description: 'The name of the owner' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Owner email',
    description: 'The email of the owner',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
