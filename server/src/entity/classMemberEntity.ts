/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  OneToMany
} from 'typeorm';
import Class from './classEntity';
import Marker from './markerEntity';
import User from './userEntity';

export enum MemberType {
  INSTRUCTOR = 'instructor',
  STUDENT = 'student'
}

@Entity()
export default class ClassMemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdDate: Date;

  @UpdateDateColumn()
  public updatedDate: Date;

  @Column()
  public memberType: MemberType;

  @ManyToOne(() => User, user => user.classes)
  public member: User;

  @ManyToOne(() => Class, cls => cls.members)
  public class: Class;

  @OneToMany(() => Marker, marker => marker.creator)
  public markers: Marker[];
}
