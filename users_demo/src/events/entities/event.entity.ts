import { User } from 'src/users/entity/users.entity';
import { Image } from '../../images/entities/image.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
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

  @OneToMany(() => Image, (image) => image.event)
  images: Image[];
}
