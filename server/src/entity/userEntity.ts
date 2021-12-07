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
import ClassMember from './classMemberEntity';
import MarkerTextMessageEntity from './markerTextMessageEntity';

@Entity()
export default class UserEntity extends BaseEntity {
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

  @OneToMany(() => MarkerTextMessageEntity, message => message.user)
  markerMessages: MarkerTextMessageEntity[];
}
