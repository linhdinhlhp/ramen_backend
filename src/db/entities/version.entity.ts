import { IsNumber } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Document } from './document.entity';

@Entity('versions')
export class Version extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  versionId: string;

  @Column()
  documentId: string;

  @Column()
  versionName: string;

  @Column()
  url: string;

  @Column()
  @IsNumber()
  downloadNumber: number;

  @Column()
  created_by: string;

  @Column()
  note: string;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Document, (document) => document.versions)
  @JoinColumn({ name: 'documentId' })
  document: Document;
}
