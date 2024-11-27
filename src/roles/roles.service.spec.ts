import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';
import { User } from 'src/users/entities/user.entity/user.entity';
import { Repository } from 'typeorm';

describe('RolesService', () => {
  let service: RolesService;
  let rolesRepository: Repository<Role>;
  let usersRepository: Repository<User>;

  const mockRolesRepository = {
    save: jest.fn(),
    create: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  const mockUsersRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRolesRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    rolesRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a role', async () => {
    const createRoleDto = { name: 'admin' };
    mockRolesRepository.create.mockReturnValue(createRoleDto);
    mockRolesRepository.save.mockResolvedValue({ id: 1, ...createRoleDto });

    const result = await service.createRole(createRoleDto);
    expect(result).toEqual({ id: 1, name: 'admin' });
    expect(mockRolesRepository.save).toHaveBeenCalledWith(createRoleDto);
  });

  it('should update user role', async () => {
    const user = { id: 1, role: null } as User;
    const role = { id: 2, name: 'editor' } as Role;
    const updateRoleDto = { roleId: 2 };

    mockUsersRepository.findOneBy.mockResolvedValue(user);
    mockRolesRepository.findOneBy.mockResolvedValue(role);
    mockUsersRepository.save.mockResolvedValue({ ...user, role });

    const result = await service.updateUserRole(updateRoleDto, 1);
    expect(result.role).toEqual(role);
  });

  it('should throw error when user or role is not found during update', async () => {
    const updateRoleDto = { roleId: 999 }; 
    mockUsersRepository.findOneBy.mockResolvedValue(null);
    mockRolesRepository.findOneBy.mockResolvedValue(null);

    await expect(service.updateUserRole(updateRoleDto, 1)).rejects.toThrow(
      'User or Role not found',
    );
  });

  it('should delete user', async () => {
    const user = { id: 1 };
    mockUsersRepository.findOneBy.mockResolvedValue(user);
    mockUsersRepository.remove.mockResolvedValue(user);

    const result = await service.deleteUser(1);
    expect(result).toEqual(user);
  });
});
