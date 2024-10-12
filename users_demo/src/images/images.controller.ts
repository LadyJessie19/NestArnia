import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/file-upload.utils';
import { Response } from 'express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload/:eventId')
  @ApiOperation({ summary: 'Upload de imagem' })
  @ApiParam({ name: 'eventId', type: 'number', description: 'Event ID' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('eventId') eventId: string,
  ) {
    if (!file) {
      throw new BadRequestException('File is not defined');
    }
    return this.imagesService.uploadImage(file, +eventId);
  }

  @Get(':imageName')
  @ApiOperation({ summary: 'Obter imagem no navegador ' })
  async getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    return res.sendFile(imageName, { root: './uploads' });
  }
}
