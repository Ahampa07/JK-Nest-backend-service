import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guard/roles.guard';

describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;

  const mockRolesService = {
    createRole: jest.fn(),
    updateUserRole: jest.fn(),
    getUsers: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: mockRolesService,
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<RolesController>(RolesController);
    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a role', async () => {
    const createRoleDto = { name: 'admin' };
    mockRolesService.createRole.mockResolvedValue({ id: 1, name: 'admin' });
    expect(await controller.createRole(createRoleDto)).toEqual({
      id: 1,
      name: 'admin',
    });
  });

  it('should update user role', async () => {
    const updateRoleDto = { roleId: 2 };
    mockRolesService.updateUserRole.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      role: { id: 2, name: 'editor' },
    });
    expect(await controller.updateUserRole(1, updateRoleDto)).toEqual({
      id: 1,
      email: 'test@example.com',
      role: { id: 2, name: 'editor' },
    });
  });

  it('should get all users', async () => {
    mockRolesService.getUsers.mockResolvedValue([]);
    expect(await controller.getAllUsers()).toEqual([]);
  });

  it('should delete a user', async () => {
    mockRolesService.deleteUser.mockResolvedValue(undefined);
    expect(await controller.deleteUser(1)).toBeUndefined();
  });
});
