import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/roles/enum/roles.enum';
import { User } from 'src/users/entities/user.entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.admin,
        },
      },
    });

    if (countAdmin === 0) {
      await this.repository.save(
        this.repository.create({
          id: 1,
          firstName: 'Super',
          lastName: 'Admin',
          email: 'admin@example.com',
          password: 'Admin@123',
          role: {
            id: RoleEnum.admin,
            name: 'admin',
          },
        }),
      );
    }
  }
}
