import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Para verificar se a minha api está recebendo requisições.',
  })
  @Get('health')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
