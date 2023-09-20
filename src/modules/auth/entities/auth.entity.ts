import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  lastname: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { unique: true })
  email: string;

  @Column()
  birthday: string;

  @Column('text')
  phone: string;

  @Column('boolean', { default: true })
  isAcribe: boolean;

  @Column('text', { default: 'user' })
  role: string;

  @BeforeInsert()
  transformFields() {
    this.email = this.email.toLowerCase().trim();
    this.name = this.name.toLowerCase().trim();
    this.lastname = this.lastname.toLowerCase().trim();
    this.email = this.email.toLowerCase().trim();
  }
}
