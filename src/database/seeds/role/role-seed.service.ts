import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/roles.entity';
import { RoleEnum } from 'src/roles/enum/roles.enum';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        id: RoleEnum.admin,
      },
    });

    if (countAdmin === 0) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.admin,
          name: 'admin',
        }),
      );
    }

    const countEditor = await this.repository.count({
      where: {
        id: RoleEnum.editor,
      },
    });

    if (countEditor === 0) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.editor,
          name: 'editor',
        }),
      );
    }

    const countViewer = await this.repository.count({
      where: {
        id: RoleEnum.viewer,
      },
    });

    if (countViewer === 0) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.viewer,
          name: 'viewer',
        }),
      );
    }
  }
}
