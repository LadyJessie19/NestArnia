import { User } from 'src/users/entity/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  eventName: string;

  @Column({ nullable: false })
  eventDate: Date;

  @ManyToMany(() => User, (user) => user.events)
  @JoinTable({ name: 'users_events' })
  participants: User[];
}
