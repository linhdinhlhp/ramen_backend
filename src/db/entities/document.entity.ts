import { IsNotEmpty, IsNumber } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Versions } from './version.entity';
import { Organization } from './organization.entity';

@Entity('documents')
export class Document extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  document_id: string;

  @Column()
  document_name: string;

  @Column()
  organizationId: number;

  @Column()
  user_id: number;

  @Column()
  url: string;

  @Column()
  created_by: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Versions, (versions) => versions.document)
  @JoinColumn()
  versions: Versions[];

  @ManyToOne(() => Organization)
  @JoinColumn()
  organization: Organization;
}
