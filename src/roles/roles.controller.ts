import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Roles } from './decorator/roles.decorator';
import { RoleEnum } from './enum/roles.enum';
import { RolesGuard } from './guard/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { createRoleDto } from './dto/createRole.dto';
import { updateRoleDto } from './dto/updateRole.dto';

@ApiTags('roles')
@Controller({
  path: 'roles',
  version: '1',
})
@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RolesController {
  constructor(public service: RolesService) {}

  @Get('users')
  async getAllUsers() {
    return await this.service.getUsers();
  }

  @Post('create/role')
  async createRole(@Body() createRoleDto: createRoleDto) {
    return await this.service.createRole(createRoleDto);
  }

  @Patch('users/:id/role')
  async updateUserRole(
    @Param('id') id: number,
    @Body() updateRoleDto: updateRoleDto,
  ) {
    return await this.service.updateUserRole(updateRoleDto, id);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.service.deleteUser(id);
  }
}
