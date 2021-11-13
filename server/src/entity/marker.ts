/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from 'typeorm';
import ClassMember from './classMember';
import Lecture from './lecture';

type MarkerType = 'question' | 'quiz' | 'notice' | 'discussion';

@Entity()
export default class Marker extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdDate: Date;

  @Column('varchar')
  public markerType: MarkerType;

  @ManyToOne(() => Lecture, lecture => lecture.markers)
  public lecture: Lecture;

  @ManyToOne(() => ClassMember, classMember => classMember.markers)
  public creator: ClassMember;
}
