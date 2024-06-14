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
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Version } from './version.entity';
import { Organization } from './organization.entity';
import { DocumentSubscription } from './subscription.entity';

@Entity('documents')
export class Document extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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
  note: string;

  @Column()
  created_by: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Version, (versions) => versions.document)
  @JoinColumn({ name: 'document_id' })
  versions: Version[];

  @ManyToOne(() => Organization, (organization) => organization.documents)
  @JoinColumn({ name: 'organizationId' })
  organization: Organization;

  @OneToMany(
    () => DocumentSubscription,
    (documentSubscription) => documentSubscription.document,
  )
  documentSubscriptions: DocumentSubscription[];
}
