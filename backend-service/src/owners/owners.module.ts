import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorsesModule } from '../horses/horses.module';
import { OwnerEntity } from './entities/owner.entity';
import { OwnersController } from './owners.controller';
import { OwnersRepository } from './owners.repository';
import { OwnersService } from './owners.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([OwnerEntity]),
    forwardRef(() => HorsesModule),
  ],
})
@Module({
  imports: [TypeOrmModule.forFeature([OwnerEntity]), HorsesModule],
  exports: [OwnersService],
  providers: [OwnersService, OwnersRepository],
  controllers: [OwnersController],
})
export class OwnersModule {}
