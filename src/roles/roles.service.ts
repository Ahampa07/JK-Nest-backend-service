import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity/user.entity';
import { createRoleDto } from './dto/createRole.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createRole(createRoleDto: createRoleDto) {
    const role = await this.rolesRepository.save(
      this.rolesRepository.create(createRoleDto),
    );
    return role;
  }

  async updateUserRole(updateRoleDto: { roleId: number }, id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    const role = await this.rolesRepository.findOneBy({
      id: updateRoleDto.roleId,
    });

    if (!user || !role) {
      throw new Error('User or Role not found');
    }

    user.role = role;
    return this.usersRepository.save(user);
  }

  async getUsers() {
    return this.usersRepository.find({ relations: ['role'] });
  }

  async deleteUser(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new Error('User not found');

    return this.usersRepository.remove(user);
  }
}
