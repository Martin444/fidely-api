import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsDate,
  IsNumber,
  IsArray,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'photoPromo',
    default:
      'http://res.cloudinary.com/photographer/image/upload/v1698582410/scublm1dh1gpakjohaop.jpg',
  })
  readonly photoURL: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'owner of commerce',
    default: '#',
  })
  readonly ownerCommerceID: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'title of cupon',
    default: 'Cupon descount',
  })
  readonly title: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'description and objetive of cupon' })
  readonly description: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'type: discount, gift' })
  readonly type: string;

  @IsNumber()
  @IsEmail()
  @ApiProperty({
    description: 'percentage of discount',
    nullable: true,
    type: Number,
  })
  readonly percentage: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'web site1', type: Number })
  readonly amount: number;

  @IsDate()
  @ApiProperty({
    description: 'Date expiration of cupon',
    nullable: false,
  })
  readonly expiryDate: Date;

  @IsNumber()
  @ApiProperty({ description: 'min buy', type: Number })
  readonly minPurchaseAmount: number;

  @IsNumber()
  @ApiProperty({ description: 'max usage', type: Number })
  readonly maxUsageCount: number;

  @IsArray()
  @ApiProperty({
    description: 'The owner defines the products to which this coupon applies',
    isArray: true,
  })
  readonly applicableProducts: [];

  @IsArray()
  @ApiProperty({
    description: 'The owner defines the products to which this coupon applies',
    isArray: true,
  })
  readonly eligibleUsers: [];
}

export class UpdateCouponDto extends PartialType(CreateCouponDto) {}
