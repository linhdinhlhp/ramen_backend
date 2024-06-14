import { Document, User } from 'src/db/entities';
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

@Entity('documentSubscriptions')
export class DocumentSubscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentId: number;

  @Column()
  userId: number;

  @Column()
  bySMS: boolean;

  @Column()
  byEmail: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.userSubscriptions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Document, (document) => document.documentSubscriptions)
  @JoinColumn({ name: 'documentId' })
  document: Document;
  //   DocumentSubscriptions: DocumentSubscription[];
}
