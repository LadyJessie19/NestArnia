import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo pet' })
  @ApiBody({ type: CreatePetDto })
  async create(
    @Body(ValidationPipe) createPetDto: CreatePetDto,
    @CurrentUser() user: PayloadDto,
  ) {
    return await this.petsService.create(createPetDto, user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pets' })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'Número da página (padrão: 1)',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'Limite de pets por página (padrão: 5)',
  })
  @ApiQuery({
    name: 'breed',
    type: 'string',
    required: false,
    description: 'Filtrar pets por raça',
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('breed') breed?: string,
  ) {
    return await this.petsService.findAll(page, limit, breed);
  }

  @Get('/my-pets')
  @ApiOperation({ summary: 'Listar os pets do usuário logado' })
  async findMyPets(@CurrentUser() user: PayloadDto) {
    return this.petsService.findMyPets(user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um pet por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID do Pet' })
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar informações de um pet' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID do Pet' })
  @ApiBody({ type: UpdatePetDto })
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
    @CurrentUser() user: PayloadDto,
  ) {
    return this.petsService.update(id, updatePetDto, user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um pet' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID do Pet' })
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }
}
