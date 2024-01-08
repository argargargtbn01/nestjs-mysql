import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Policy } from './policy.entity';
@Entity()
export class Role {
  @PrimaryGeneratedColumn({
    name: 'role_id',
  })
  roleId: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToMany(() => Policy, (policy) => policy.roles, {
    cascade: true,
  })
  @JoinTable({
    name: 'role_policy',
    joinColumn: { name: 'role_id', referencedColumnName: 'roleId' },
    inverseJoinColumn: { name: 'policy_id', referencedColumnName: 'policyId' },
  })
  policies: Policy[];
}
