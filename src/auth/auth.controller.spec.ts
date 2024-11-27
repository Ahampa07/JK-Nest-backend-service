import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto/register.dto';
import { LoginDto } from './dto/login.dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            validateLogin: jest.fn(),
            logout: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a user', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'test123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '9999999999'
      };
      const mockResponse = {
        data: {},
        message: 'Register successfully',
        code: 200,
      };
      jest.spyOn(service, 'register').mockResolvedValueOnce(mockResponse);

      const result = await controller.register(registerDto);

      expect(result).toEqual(mockResponse);
      expect(service.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('should login a user and set cookie', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'test123',
      };
      const req = {};
      const res = { cookie: jest.fn(), send: jest.fn() };
      const headers = {};
      const mockResponse = {
        data: { token: 'jwtToken' },
        message: 'Login successfully',
        code: 200,
      };
      jest.spyOn(service, 'validateLogin').mockResolvedValueOnce(mockResponse);

      await controller.login(loginDto, req as any, res as any, headers);

      expect(service.validateLogin).toHaveBeenCalledWith(
        loginDto,
        req,
        headers,
      );
      expect(res.cookie).toHaveBeenCalledWith('jwt', 'jwtToken', {
        httpOnly: true,
      });
      expect(res.send).toHaveBeenCalledWith(mockResponse);
    });
  });

 describe('logout', () => {
   it('should logout a user and clear cookie', async () => {
     const user = { id: 1 } as any;
     const res = {
       clearCookie: jest.fn(),
       send: jest.fn(),
     };
     const mockResponse = {
       data: {},
       message: 'Logged out successfully',
       code: 200,
     };
     jest.spyOn(service, 'logout').mockResolvedValueOnce(mockResponse);

     await controller.logout(user, res);
     expect(service.logout).toHaveBeenCalledWith(user);
     expect(res.clearCookie).toHaveBeenCalledWith('jwt');
     expect(res.send).toHaveBeenCalledWith(mockResponse);
   });
 });

});
