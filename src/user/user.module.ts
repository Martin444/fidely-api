import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
// import { AddressController } from './controllers/address.controller';
// import { AddressService } from './services/address.service';
// import { Address } from './entitys/address.entity';
// import { PasswordService } from './services/password/password.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
