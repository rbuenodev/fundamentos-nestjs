/* eslint-disable prettier/prettier */
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag.entity';
import { v4 as uuid } from 'uuid';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @JoinTable({ name: 'courses_tags' })
  @ManyToMany(() => Tag, (tag: Tag) => tag.courses, { cascade: true })
  tags: Tag[];
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @BeforeInsert()
  generatedId() {
    console.log(this.id);
    if (this.id) {
      return;
    }
    this.id = uuid();
    console.log(this.id);
  }
}
