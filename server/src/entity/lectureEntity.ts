/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import Class from './classEntity';
import Marker from './markerEntity';

@Entity()
export default class LectureEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdDate: Date;

  @UpdateDateColumn()
  public updatedDate: Date;

  @Column('datetime')
  public lectureDate: Date;

  @Column('varchar')
  public lectureName: string;

  @Column('varchar')
  public playlist: string;

  @ManyToOne(() => Class, cls => cls.lectures)
  public class: Class;

  @OneToMany(() => Marker, marker => marker.lecture)
  public markers: Marker;
}
