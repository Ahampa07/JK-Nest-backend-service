import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createRoleDto {
  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  name: string;
}
