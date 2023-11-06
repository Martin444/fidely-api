import { Module } from '@nestjs/common';
import { CommercesService } from './commerces.service';
import { CommercesController } from './commerces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commerce } from './entities/commerce.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commerce])],
  controllers: [CommercesController],
  providers: [CommercesService],
})
export class CommercesModule {}
