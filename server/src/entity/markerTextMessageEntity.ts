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
import UserEntity from './userEntity';

@Entity()
export default class MarkerTextMessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('text')
  ko: string;

  @Column('text')
  en: string;

  @ManyToOne(() => MarkerEntity, marker => marker.textMessages)
  marker: MarkerEntity;

  @ManyToOne(() => UserEntity, user => user.markerMessages)
  user: UserEntity;
}
