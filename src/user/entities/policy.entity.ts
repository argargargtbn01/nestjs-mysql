import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Policy {
  @PrimaryGeneratedColumn({
    name: 'policy_id',
  })
  policyId: number;

  @Column()
  action: string;

  @Column()
  subject: string;

  @Column('text', {
    nullable: true,
    array: true,
  })
  fields?: any[];

  @Column('text', {
    nullable: true,
    array: true,
  })
  conditions?: any[];

  @ManyToMany(() => Role, (role) => role.policies, {})
  roles: Role[];
}
