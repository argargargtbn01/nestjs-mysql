import { AbstractAuditingEntity } from 'src/common/entities/abstract-auditing-entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User extends AbstractAuditingEntity {
  @PrimaryColumn()
  uid: string;

  @Column()
  email: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({
    referencedColumnName: 'roleId',
    name: 'role_id',
  })
  role?: any;
}
