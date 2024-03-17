import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  ownerCommerceID: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  photoURL: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @IsOptional()
  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ nullable: true })
  percentage: number;

  @Column({ nullable: true })
  amount: number;

  @Column({
    name: 'expiry_date',
    nullable: true,
    type: 'timestamptz',
  })
  expiryDate: Date;

  @Column({ name: 'min_purchase_amount' })
  minPurchaseAmount: number;

  @Column({ name: 'max_usage_count' })
  maxUsageCount: number;

  @Column('varchar', { array: true, nullable: true })
  applicableProducts: string[];

  @Column('varchar', { array: true, nullable: true })
  eligibleUsers: string[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
