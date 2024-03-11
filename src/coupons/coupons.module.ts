import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { CommercesModule } from 'src/commerces/commerces.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon]), CommercesModule],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
