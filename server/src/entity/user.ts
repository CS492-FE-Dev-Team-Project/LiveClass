/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import ClassMember from './classMember';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdDate: Date;

  @UpdateDateColumn()
  public updatedDate: Date;

  @Column('varchar')
  public userName: string;

  @Column()
  public naverId: string;

  @OneToMany(() => ClassMember, classMember => classMember.member)
  public classes: ClassMember[];
}
