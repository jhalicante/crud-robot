import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CollaboratorMemberEntity } from './collaborator-member.entity';

@Entity('robot_info')
export class RobotInfoEntity {
  @PrimaryGeneratedColumn('uuid')
  robotId: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  fullName: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  avatarURL: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  position: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  assignedProject: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', {
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  collaboratorMembers?: string;
}
