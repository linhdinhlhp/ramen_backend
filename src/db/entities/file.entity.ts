import { IsNotEmpty, IsNumber } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('files')
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  documentId: string;

  @Column()
  versionId: string;

  @Column()
  @IsNotEmpty()
  uploadDate: Date;

  @Column()
  @IsNumber()
  viewNumber: number;

  @Column()
  @IsNumber()
  downloadNumber: number;

  @Column()
  dateEdit: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
