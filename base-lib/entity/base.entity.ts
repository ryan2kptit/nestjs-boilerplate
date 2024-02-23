import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UtilService } from '../util.service';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column({name: "isDeleted", type: 'boolean', nullable: true})
  isDeleted: boolean = false;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp without time zone' })
  @UtilService.searchable({ type: 'date' })
  @UtilService.getProperty
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp without time zone' })
  @UtilService.searchable({ type: 'date' })
  @UtilService.getProperty
  updatedAt: Date;
}
