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
        firstName: { type: 'string', example: 'Jéssica', required: ['aaa'] },
        lastName: { type: 'string', example: 'Moura' },
        age: { type: 'number', example: 25 },
      },
    },
  })
  create(@Body(ValidationPipe) createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'Para a listagem de todos os clientes. Aceita parâmetros de query age, para a filtragem',
  })
  @ApiQuery({
    name: 'age',
    required: false,
    description: 'Para a filtragem dos meus clientes pela idade.',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Clientes encontrados com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum cliente com essa idade no banco',
  })
  findAll(@Query('age') age?: string) {
    return this.customersService.findAll(+age);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Rota para pegar o cliente pelo id.' })
  @ApiParam({
    name: 'id',
    description: 'Parâmetro para pegar pelo id',
    type: 'number',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }
}
