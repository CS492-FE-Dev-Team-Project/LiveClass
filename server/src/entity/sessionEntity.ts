import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { SessionEntity as TypeormStoreSessionEntity } from 'typeorm-store';

@Entity()
export default class SessionEntity
  extends BaseEntity
  implements TypeormStoreSessionEntity
{
  @PrimaryColumn()
  public id: string;

  @Column()
  public expiresAt: number;

  @Column()
  public data: string;
}
