import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Mock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;
}
