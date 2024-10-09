import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  Req,
  Query,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body(ValidationPipe) createPetDto: CreatePetDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    return this.petsService.create(createPetDto, userId);
  }

  @Get()
  async findAll(@Query('breed') breed?: string) {
    return await this.petsService.findAll(breed);
  }

  @Get('/my-pets')
  @UseGuards(JwtAuthGuard)
  async findMyPets(@Req() req: Request) {
    const userId = req['user'].sub;
    return this.petsService.findMyPets(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    return this.petsService.update(id, updatePetDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }
}
