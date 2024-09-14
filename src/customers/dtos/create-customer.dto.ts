import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString({ message: 'Precisa ser uma string' })
  firstName: string;

  @IsNotEmpty()
  @IsString({ message: 'Também precisa ser um nome' })
  lastName: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  age: number;
}
