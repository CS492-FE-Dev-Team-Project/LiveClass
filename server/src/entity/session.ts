import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { SessionEntity } from 'typeorm-store';

@Entity()
class Session extends BaseEntity implements SessionEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public expiresAt: number;

  @Column()
  public data: string;
}

export default Session;
