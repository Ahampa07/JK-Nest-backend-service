import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';
import { User } from 'src/users/entities/user.entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User]),
    UsersModule
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
