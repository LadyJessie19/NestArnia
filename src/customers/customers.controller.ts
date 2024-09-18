import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('customers')
@ApiTags('Customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  @ApiBody({
    schema: {
      properties: {
        firstName: { type: 'string', example: 'Jéssica' },
        lastName: { type: 'string', example: 'Moura' },
        age: { type: 'number', example: 25 },
      },
    },
  })
  @ApiOperation({
    summary: 'Criação de um novo cliente',
    description: `<strong>Cria</strong> um novo cliente. <br/> 
                  É necessário fornecer o <code>firstName</code>, <code>lastName</code> e a <code>age</code> do cliente.`,
  })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.' })
  create(@Body(ValidationPipe) createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listagem de todos os clientes',
    description:
      'Aceita parâmetros de query como <code>age</code> para a filtragem dos clientes.',
  })
  @ApiQuery({
    name: 'age',
    required: false,
    description: 'Filtra os clientes pela idade.',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Clientes encontrados com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum cliente com essa idade encontrado no banco.',
  })
  findAll(@Query('age') age?: string) {
    return this.customersService.findAll(+age);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Busca de um cliente específico',
    description:
      'Rota para buscar um cliente através do <code>id</code> fornecido.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente a ser buscado.',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente com o ID fornecido não foi encontrado.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualização de um cliente',
    description: `Atualiza os dados de um cliente através do <code>id</code> fornecido. 
                  É possível alterar <code>firstName</code>, <code>lastName</code> ou <code>age</code>.`,
  })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente a ser atualizado.',
    type: 'number',
  })
  @ApiBody({
    schema: {
      properties: {
        firstName: {
          type: 'string',
          example: 'John',
          description: 'Nome do cliente',
        },
        lastName: {
          type: 'string',
          example: 'Doe',
          description: 'Sobrenome do cliente',
        },
        age: { type: 'number', example: 30, description: 'Idade do cliente' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente atualizado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente com o ID fornecido não foi encontrado.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remoção de um cliente',
    description: 'Remove um cliente através do <code>id</code> fornecido.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente a ser removido.',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente removido com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente com o ID fornecido não foi encontrado.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }
}
