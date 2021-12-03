/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import ClassMember from './classMemberEntity';
import Lecture from './lectureEntity';

import { MarkerType } from '../types';
import MarkerTextMessageEntity from './markerTextMessageEntity';
// type MarkerType = 'question' | 'quiz' | 'notice' | 'discussion';

@Entity()
export default class MarkerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdDate: Date;

  @Column()
  public markerType: MarkerType;

  @Column()
  public videoIndex: number;

  @Column()
  public time: number;

  @ManyToOne(() => Lecture, lecture => lecture.markers)
  public lecture: Lecture;

  @ManyToOne(() => ClassMember, classMember => classMember.markers)
  public creator: ClassMember;

  @OneToMany(() => MarkerTextMessageEntity, message => message.marker)
  public textMessages: MarkerTextMessageEntity[];
}
