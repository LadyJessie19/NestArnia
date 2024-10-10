import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
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
