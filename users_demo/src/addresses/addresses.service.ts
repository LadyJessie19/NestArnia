import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressesRepository: Repository<Address>,
  ) {}
  async create(createAddressDto: CreateAddressDto) {
    const address = this.addressesRepository.create(createAddressDto);
    return this.addressesRepository.save(address);
  }

  async findAll() {
    return await this.addressesRepository.find();
  }

  async findOne(id: string) {
    const address = await this.addressesRepository.findOneBy({ id });
    if (!address) throw new NotFoundException('Entidade não encontrada');
    return address;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto, userId: string) {
    const address = await this.addressesRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (address.user.id !== userId) {
      throw new UnauthorizedException(
        'O usuário não tem permissão para alterar esse endereço',
      );
    }

    await this.addressesRepository.update(id, updateAddressDto);
    return this.addressesRepository.save(address);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.addressesRepository.delete({ id });
    return `The address was sucessfully deleted. Have a nice day!`;
  }
}
