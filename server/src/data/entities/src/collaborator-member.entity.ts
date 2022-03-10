import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RobotInfoEntity } from './robot-info.entity';

@Entity('collaborator_member')
export class CollaboratorMemberEntity {
  @PrimaryGeneratedColumn('uuid')
  collaboratorMemberId: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreated: Date;

  @Column('timestamp', {
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  lastModifiedDate: Date;

  // Link to parent table
  // @ManyToOne(() => RobotInfoEntity, (robotInfo) => robotInfo.collaboratorMember)
  // @JoinColumn({ name: 'robotId' })
  // public robotInfo: RobotInfoEntity;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  memberId: string;
}
