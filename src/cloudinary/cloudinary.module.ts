import { Module } from '@nestjs/common';
import { CloudinaryService } from './services/cloudinary.service';
import { CloudinaryProvider } from '../cloudinary/providers/cloudinary';
import { CloudinaryController } from './controllers/cloudinary.controller';

@Module({
  imports: [CloudinaryModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
