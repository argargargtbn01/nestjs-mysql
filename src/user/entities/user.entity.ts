import { AbstractAuditingEntity } from 'src/common/entities/abstract-auditing-entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User extends AbstractAuditingEntity {
  @PrimaryColumn()
  uid: string;

  @Column()
  email: string;

  @ManyToMany(() => Role, (role) => role.users, {
    cascade: true,
  })
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_uid', referencedColumnName: 'uid' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'roleId' },
  })
  roles: Role[];
}
