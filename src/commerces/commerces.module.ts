import { Global, Module } from '@nestjs/common';
import { CommercesService } from './commerces.service';
import { CommercesController } from './commerces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commerce } from './entities/commerce.entity';
import { ClientUser } from './entities/client.entity';
import { UserModule } from 'src/user/user.module';
import { PurchaseClientUser } from './entities/purchase.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Commerce, ClientUser, PurchaseClientUser]),
    UserModule,
  ],
  controllers: [CommercesController],
  providers: [CommercesService],
  exports: [CommercesService],
})
export class CommercesModule {}
