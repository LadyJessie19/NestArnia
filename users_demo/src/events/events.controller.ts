import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo evento' })
  @ApiBody({ type: CreateEventDto })
  async create(@Body(ValidationPipe) createEventDto: CreateEventDto) {
    return await this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os eventos ou listar pela data do evento',
  })
  @ApiQuery({ name: 'fromDate', type: 'string', description: 'Event date' })
  async getAll(@Query('fromDate') fromDate: string) {
    if (fromDate) {
      return this.eventsService.findByEventDate(new Date(fromDate));
    }
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontrar um evento pelo id' })
  @ApiParam({ name: 'id', type: 'number', description: 'Event ID' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um evento' })
  @ApiParam({ name: 'id', type: 'number', description: 'Event ID' })
  @ApiBody({ type: UpdateEventDto })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Patch(':eventId/date')
  @ApiOperation({ summary: 'Atualizar a data do evento' })
  @ApiParam({ name: 'eventId', type: 'number', description: 'Event ID' })
  async updateEventDate(
    @Param('eventId') eventId: number,
    @Body('newDate') newDate: string,
  ) {
    const parsedDate = new Date(newDate);
    return this.eventsService.updateEventDate(eventId, parsedDate);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um evento pelo id' })
  @ApiParam({ name: 'id', type: 'number', description: 'Event ID' })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }

  @Post(':id/participate')
  @ApiOperation({ summary: 'Usuário logado consegue participar de um evento' })
  @ApiParam({ name: 'id', type: 'number', description: 'Event ID' })
  async participate(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: PayloadDto,
  ) {
    return await this.eventsService.participate(id, user.sub);
  }
}
