import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class updateRoleDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  roleId: number;
}
