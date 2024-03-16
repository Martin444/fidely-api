import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class PurchaseClientUser {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  ownerCommerce: string;

  @Column('varchar', { nullable: true })
  clientId: string;

  @Column('varchar', { nullable: true })
  description: string;

  @Column({ nullable: false, type: Number })
  amount: number;

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
