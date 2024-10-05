import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  breed: string;
}
