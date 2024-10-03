import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    // console.log(request);
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('entrou aqui');
      return false;
    }

    const token = authHeader.split(' ')[1];
    console.log(token);
    try {
      const decoded = this.jwtService.verifyAsync(token);
      console.log('decode', decoded);
      request['user'] = decoded;
      return true;
    } catch (error) {
      return false;
    }
  }
}
