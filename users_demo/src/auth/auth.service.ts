import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    const isAuthenticadedUser = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isAuthenticadedUser) {
      throw new UnauthorizedException('Credencias inválidas para o login');
    }

    const payload = { email: user.email, sub: user.id };

    return {
      token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
      }),
    };
  }
}
