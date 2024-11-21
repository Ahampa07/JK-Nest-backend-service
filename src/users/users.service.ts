import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto/register.dto';
import { EntityCondition } from 'src/utils/entity-condition.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createProfileDto: RegisterDto) {
    const user = await this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
    return user;
  }

  async findOne(feilds: EntityCondition<User>) {
    const user = await this.usersRepository.findOne({ where: feilds });
    return user;
  }
}
