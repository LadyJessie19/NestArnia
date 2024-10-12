import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from 'src/images/entities/image.entity';
import { Event } from '../events/entities/event.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly configService: ConfigService,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
    eventId: number,
  ): Promise<Image> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    const imageLink = `${this.configService.get('BASE_URL')}/images/${file.filename}`;

    const image = this.imageRepository.create({
      imageLink,
      event,
    });

    return this.imageRepository.save(image);
  }
}
