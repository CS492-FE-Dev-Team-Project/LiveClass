/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import MarkerEntity from './markerEntity';

@Entity()
export default class MarkerTextMessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('text')
  message: string;

  @ManyToOne(() => MarkerEntity, marker => marker.textMessages)
  marker: MarkerEntity;
}
