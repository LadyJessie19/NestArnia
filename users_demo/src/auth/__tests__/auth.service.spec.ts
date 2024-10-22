import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { UsersServiceMock } from './mocks/users-service.mock';
import { JwtServiceMock } from './mocks/jwt-service.mock';
import { ConfigServiceMock } from './mocks/config-service.mock';
import { mockUser } from './mocks/user.mock';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: UsersServiceMock },
        { provide: JwtService, useValue: JwtServiceMock },
        { provide: ConfigService, useValue: ConfigServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should return a token', async () => {
    const loginDto = { email: mockUser.email, password: mockUser.password };

    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

    const result = await authService.login(loginDto);

    expect(result).toEqual({ token: 'mockToken' });
    expect(usersService.findByEmail).toHaveBeenCalledWith(mockUser.email);
  });
});
/*
- Criar o arquivo .spec | ex: auth.service.ts -> auth.service.spec.ts
- Abrir o método describe com os parêmetros | descrição e callback

** Mocks

- Mockar as dependências da classe | ex: AuthService { usersService - JwtService - ConfigService }

- Mockar as informações para realizar os testes | ex: MockUser

** Preparar o ambiente de testes

- configurar o BeforeEach() ou o BeforeAll() para a realização dos testes
    - Classe não possui dependências? - instancia a classe
    - Classe possui dependêcias? - configura o module simulando o módulo real

** Teste

1. Prepara as informações para o teste | ex: ALgum mock específico ou alguma informação
2. Armazena o resultado do método testado dentro de uma variável
3. Valida o resultado esperado

*/
