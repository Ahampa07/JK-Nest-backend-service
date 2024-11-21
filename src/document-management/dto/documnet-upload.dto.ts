import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DocumentUploadDto {
  @ApiProperty({ example: 'My document' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'image upload' })
  @IsNotEmpty()
  description: string;
}
