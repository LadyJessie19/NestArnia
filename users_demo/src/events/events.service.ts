import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { User } from 'src/users/entity/users.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  async create(createEventDto: CreateEventDto) {
    const event = this.eventsRepository.create({
      eventName: createEventDto.eventName,
      eventDate: new Date(createEventDto.eventDate),
    });
    return await this.eventsRepository.save(event);
  }

  async findAll() {
    return await this.eventsRepository.find();
  }

  async findByEventDate(date: Date): Promise<Event[]> {
    return await this.eventsRepository.find({
      where: {
        eventDate: MoreThanOrEqual(date),
      },
    });
  }

  async findOne(id: number) {
    try {
      const event = await this.eventsRepository.findOneOrFail({
        where: { id },
        relations: ['images'],
      });
      return event;
    } catch (error) {
      if (error.name === 'EntityNotFoundError') {
        throw new NotFoundException(`Event with ID ${id} not found`);
      }
      throw error;
    }
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  async updateEventDate(eventId: number, newDate: Date): Promise<Event> {
    const event = await this.eventsRepository.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    event.eventDate = newDate;
    return this.eventsRepository.save(event);
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }

  async participate(eventId: number, userId: string) {
    const event = await this.eventsRepository.findOneOrFail({
      where: { id: eventId },
      relations: ['participants'],
    });

    const user = await this.usersRepository.findOneOrFail({
      where: { id: userId },
    });

    event.participants.push(user);

    return await this.eventsRepository.save(event);
  }
}
