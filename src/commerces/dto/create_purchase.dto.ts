import { IsNumber, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseDto {
  @IsString()
  @ApiProperty({ description: 'Validate if is verify user' })
  readonly clientId: string;

  @IsString()
  @ApiProperty({ description: 'the name of user' })
  readonly description: string;

  @IsNumber()
  @ApiProperty({
    description: 'total Amount',
    type: Number,
  })
  readonly amount: number;
}

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {}
