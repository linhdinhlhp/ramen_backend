
import { IsNotEmpty, IsNumber } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Document } from './document.entity';

@Entity('versions')
export class Versions extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  versionId: string;

  @Column()
  url: string;

  @Column()
  @IsNotEmpty()
  uploadDate: Date;

  @Column()
  @IsNumber()
  downloadNumber: number;

  @Column()
  created_by: string;
  
  @CreateDateColumn()
  createdAt: Date;


  @ManyToOne(() => Document)
  @JoinColumn()
  document: Document;
}
