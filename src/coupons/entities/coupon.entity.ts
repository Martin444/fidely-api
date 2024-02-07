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
  categoryId: string;

  @Column({ type: 'varchar', length: 255 })
  photoURL: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @IsOptional()
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'boolean', default: false })
  emailValidate: boolean;

  @Column({ type: 'varchar', length: 255 })
  web: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  validateFile: string;

  @Column({ type: 'varchar', length: 100 })
  businessType: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  dateExpiration: Date;

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
