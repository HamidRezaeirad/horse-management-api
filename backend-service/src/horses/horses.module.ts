import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersModule } from '../owners/owners.module';
import { HorseEntity } from './entities/horse.entity';
import { HorsesController } from './horses.controller';
import { HorsesRepository } from './horses.repository';
import { HorsesService } from './horses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HorseEntity]),
    forwardRef(() => OwnersModule),
  ],
  providers: [HorsesService, HorsesRepository],
  controllers: [HorsesController],
  exports: [HorsesService, HorsesRepository],
})
export class HorsesModule {}
