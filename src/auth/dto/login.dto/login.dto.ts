import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: 'admin@example.com' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsNotEmpty()
  email: string;

  @ApiProperty({example: 'Admin@123'})
  @IsNotEmpty()
  password: string;
}
