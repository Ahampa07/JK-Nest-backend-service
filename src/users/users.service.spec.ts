import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto/register.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
      it('should create a user', async () => {
        const createProfileDto: RegisterDto = {
        firstName: 'John',
        password: 'password123',
        email: 'test@example.com',
        lastName: 'Doe',
        phone: '0987654321',
      };

      const user: User = {
        id: 1,
        previousPassword: 'hashedpass',
        loadPreviousPassword: jest.fn(),
        setPassword: jest.fn(),
        ...createProfileDto,
      };

      jest.spyOn(repository, 'create').mockReturnValue(user); 
      jest.spyOn(repository, 'save').mockResolvedValue(user); 

      const result = await service.create(createProfileDto);

      expect(result).toEqual(user);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(createProfileDto),
      );
    });
  });

  describe('findOne', () => {
    it('should return null if user is not found', async () => {
      const findFields = { email: 'nonexistent@example.com' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.findOne(findFields);

      expect(result).toBeNull();
      expect(repository.findOne).toHaveBeenCalledWith({ where: findFields });
    });
  });
});
