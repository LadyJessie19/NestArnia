import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo endereço' })
  @ApiBody({ type: CreateAddressDto })
  create(@Body(ValidationPipe) createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os endereços' })
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um endereço por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID do endereço' })
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um endereço' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID do endereço' })
  @ApiBody({ type: UpdateAddressDto })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateAddressDto: UpdateAddressDto,
    @CurrentUser() user: PayloadDto,
  ) {
    return this.addressesService.update(id, updateAddressDto, user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um endereço' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID do endereço' })
  remove(@Param('id') id: string) {
    return this.addressesService.remove(id);
  }
}
