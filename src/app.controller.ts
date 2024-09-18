import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({
    summary: 'Verificação de saúde da API',
    description:
      'Endpoint para verificar se a API está funcionando corretamente e se o banco de dados está respondendo.',
  })
  @ApiResponse({
    status: 200,
    description: 'A API e o banco de dados estão funcionando corretamente.',
    schema: {
      example: 'DATABASE REQUESTS ARE WORKING',
    },
  })
  @ApiResponse({
    status: 503,
    description:
      'Serviço indisponível. O banco de dados pode não estar respondendo.',
  })
  getHealth(): string {
    return this.appService.getHealth();
  }
}
