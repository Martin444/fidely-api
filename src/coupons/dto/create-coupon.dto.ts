import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CreateCouponDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'photoUrl of user' })
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'photoUrl of user',
    default:
      'http://res.cloudinary.com/photographer/image/upload/v1698582410/scublm1dh1gpakjohaop.jpg',
  })
  readonly photoURL: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'the email of user',
    default: 'example@example.com',
  })
  readonly email: string;

  @IsBoolean()
  @Exclude()
  @ApiProperty({ description: 'Validate if is verify user', default: false })
  readonly emailValidate: boolean;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the name of user' })
  readonly description: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'id of category' })
  readonly categoryId: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the name of user' })
  readonly title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'web site', default: 'webcomerce.com.ar' })
  readonly web: string;

  @IsString()
  @ApiProperty({
    description: 'Authenticate commerce',
    default: 'URl de Algun archivo legal',
  })
  readonly validateFile: string;

  @IsString()
  @ApiProperty({ description: 'the number phone', default: '+244423423432' })
  readonly phone: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Types of commerces: food, shoes, tecnology, beauty, home',
    default: 'food',
  })
  readonly businessType: string;

  @IsDate()
  @ApiProperty({
    description: 'date avilable',
  })
  dateExpiration: Date;
}

export class UpdateCouponDto extends PartialType(CreateCouponDto) {}
