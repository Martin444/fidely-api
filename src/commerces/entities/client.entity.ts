import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class ClientUser {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  ownerCommerce: string;

  @Column('varchar', { array: true, nullable: true })
  clientsIdList: string[];

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
