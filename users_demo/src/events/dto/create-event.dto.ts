import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  eventDate: string;
}
