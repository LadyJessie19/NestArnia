import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @Length(5, 30)
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
