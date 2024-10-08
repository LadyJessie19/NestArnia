import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private readonly petsRepository: Repository<Pet>,
    private readonly usersService: UsersService,
  ) {}
  async create(createPetDto: CreatePetDto, userId: string) {
    const user = await this.usersService.findOne(userId);
    const pet = this.petsRepository.create({ ...createPetDto, user });
    return await this.petsRepository.save(pet);
  }

  findAll() {
    return this.petsRepository.find();
  }

  findOne(id: string) {
    return this.petsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
