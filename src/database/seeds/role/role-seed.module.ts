import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/roles.entity';
import { RoleSeedService } from './role-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleSeedService],
  exports: [RoleSeedService],
})
export class RoleSeedModule {}
