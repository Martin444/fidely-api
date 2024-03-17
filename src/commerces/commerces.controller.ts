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
import { CommercesService } from './commerces.service';
import {
  CreateCommercesDto,
  UpdateCommercesDto,
} from './dto/create-commerce.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.gards';
import { ApiTags } from '@nestjs/swagger';
import { CreatePurchaseDto } from './dto/create_purchase.dto';

@ApiTags('Commerces')
@Controller('commerces')
export class CommercesController {
  constructor(private readonly commercesService: CommercesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: Request, @Body() createCommerceDto: CreateCommercesDto) {
    const userId = req['user']['userId'];
    return this.commercesService.create(userId, createCommerceDto);
  }

  @Get()
  findAll() {
    return this.commercesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commercesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/purchase')
  createPurchase(
    @Req() req: Request,
    @Body() createpurchaseDto: CreatePurchaseDto,
  ) {
    const userId = req['user']['userId'];
    return this.commercesService.createPurchase(userId, createpurchaseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/findpurchases/:clientID')
  findPurchases(@Req() req: Request, @Param('clientID') clientId: string) {
    const userId = req['user']['userId'];
    return this.commercesService.findPurchaseForClientBycommerce(
      userId,
      clientId,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  update(@Req() req: Request, @Body() updateCommerceDto: UpdateCommercesDto) {
    const userId = req['user']['userId'];
    return this.commercesService.update(userId, updateCommerceDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/clients/list')
  getMyClients(@Req() req: Request) {
    const userId = req['user']['userId'];
    return this.commercesService.getClientsByOwner(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commercesService.remove(id);
  }
}
