import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  findAll(breed: string | undefined) {
    const query = this.petsRepository.createQueryBuilder('pet');

    if (breed) {
      query.where('pet.breed = :breed', { breed });
    }

    return query.getMany();
  }

  findOne(id: string) {
    return this.petsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: string, updatePetDto: UpdatePetDto, userId: string) {
    const pet = await this.petsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (pet.user.id !== userId) {
      throw new UnauthorizedException('Você não pode atualizar esse pet.');
    }

    await this.petsRepository.update(id, updatePetDto);
    return await this.petsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }

  async findMyPets(userId: string) {
    return this.petsRepository.find({
      where: { user: { id: userId } },
    });
  }
}
