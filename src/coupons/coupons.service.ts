import { Injectable } from '@nestjs/common';
import { CreateCouponDto, UpdateCouponDto } from './dto/create-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CommercesService } from 'src/commerces/commerces.service';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon) private cuponRepo: Repository<Coupon>,
    private commerceServices: CommercesService,
  ) {}
  async create(createCouponDto: CreateCouponDto, userID: string) {
    const newCupon = this.cuponRepo.create(createCouponDto);
    console.log(createCouponDto);
    newCupon.id = uuidv4();
    const commerce = await this.commerceServices.findByCommerceUser(userID);
    if (commerce) {
      console.log(commerce);
      newCupon.ownerCommerceID = commerce.id;
      const cupoSaved = await this.cuponRepo.save(newCupon);
      console.log(cupoSaved);
      return cupoSaved;
    }
  }

  async findAllbyCommerce(idCommerce: string) {
    const coupons = await this.cuponRepo.find({
      where: { ownerCommerceID: idCommerce },
    });
    return coupons;
  }

  async findAllbyOwner(ownerId: string) {
    const commerce = await this.commerceServices.findByCommerceUser(ownerId);
    if (commerce) {
      const coupons = await this.findAllbyCommerce(commerce.id);
      return coupons;
    }
  }

  findOne(idCupon: string) {
    return this.cuponRepo.findOneBy({ id: idCupon });
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  async remove(id: string) {
    return await this.cuponRepo.delete({ id });
  }
}
