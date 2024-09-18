import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Primeiro nome do cliente',
    type: 'string',
    example: 'Jéssica',
  })
  @IsNotEmpty()
  @IsString({ message: 'Precisa ser uma string' })
  firstName: string;

  @ApiProperty({
    description: 'Sobrenome do cliente',
    type: 'string',
    example: 'Moura',
  })
  @IsNotEmpty()
  @IsString({ message: 'Também precisa ser um nome' })
  lastName: string;

  @ApiProperty({
    description: 'Idade do cliente',
    type: 'number',
    example: 25,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  age: number;
}
