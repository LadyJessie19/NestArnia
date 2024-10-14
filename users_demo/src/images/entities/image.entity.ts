import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  imageLink: string;

  @ManyToOne(() => Event, (event) => event.images, { onDelete: 'CASCADE' })
  event: Event;
}
