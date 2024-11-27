import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Message } from 'src/utils/message';

jest.mock('bcryptjs', () => ({
  ...jest.requireActual('bcryptjs'),
  compare: jest.fn(),
}));

jest.mock('winston', () => ({
  info: jest.fn(),
}));

const mockUsersService = {
  findOne: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should throw an error if the user already exists', async () => {
      mockUsersService.findOne.mockResolvedValue({ email: 'test@example.com' });

      await expect(
        authService.register({
          email: 'test@example.com',
          password: 'StrongP@ss1',
          firstName: 'John',
          lastName: 'Doe',
          phone: '9999999999',
        }),
      ).rejects.toThrow(HttpException);
    });

    it('should return success for a weak password', async () => {
      mockUsersService.findOne.mockResolvedValue(null);

      const result = await authService.register({
        email: 'test@example.com',
        password: 'weakpass',
        firstName: 'John',
        lastName: 'Doe',
        phone: '9999999999',
      });

      expect(result.message).toEqual(
        'Password Must Contain One Uppercase, One Lowercase, One Number, One Special Case and Minimum 8 Characters',
      );
    });

    it('should create a new user for a valid request', async () => {
      mockUsersService.findOne.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
      });

      const result = await authService.register({
        email: 'test@example.com',
        password: 'StrongP@ss1',
        firstName: 'John',
        lastName: 'Doe',
        phone: '9999999999',
      });

      expect(result.message).toEqual('Registered successfully.');
      expect(result.data.user).toBeDefined();
    });
  });

  describe('validateLogin', () => {
    it('should throw an error if the user is not found', async () => {
      mockUsersService.findOne.mockResolvedValue(null);

      await expect(
        authService.validateLogin(
          { email: 'test@example.com', password: 'password' },
          {} as any,
          {},
        ),
      ).rejects.toThrow(HttpException);
    });
  })


  describe('logout', () => {
    it('should throw an error if the user is not found', async () => {
      mockUsersService.findOne.mockResolvedValue(null);

      await expect(
        authService.logout({ id: 1 } as any),
      ).rejects.toThrow('User not found');
    });

    it('should return success for a valid logout', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpass',
        firstName: 'John',
        lastName: 'Doe',
        phone: '5890987654',
        previousPassword: 'hashedpass',
        loadPreviousPassword: jest.fn(), 
        setPassword: jest.fn(),
      };

      mockUsersService.findOne.mockResolvedValue(mockUser);

      const response = await authService.logout(mockUser);

      expect(response).toHaveProperty('message', Message.USER.LOGOUT_SUCCESS);
      expect(response.code).toBe(HttpStatus.OK);
    });
  });
});
