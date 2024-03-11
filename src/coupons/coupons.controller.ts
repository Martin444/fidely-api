import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto, UpdateCouponDto } from './dto/create-coupon.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.gards';
@ApiTags('coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: Request, @Body() createCouponDto: CreateCouponDto) {
    const userId = req['user']['userId'];
    return this.couponsService.create(createCouponDto, userId);
  }

  @Get('/bycommerce/:idCommerce')
  findAllcuponsCommerce(@Param('idCommerce') id: string) {
    return this.couponsService.findAllbyCommerce(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/mycupons/commerces')
  findAll(@Req() req: Request) {
    const userId = req['user']['userId'];
    return this.couponsService.findAllbyOwner(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponsService.remove(id);
  }
}
