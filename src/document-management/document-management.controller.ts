import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  HttpStatus,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DocumentManagementService } from './document-management.service';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { RoleEnum } from 'src/roles/enum/roles.enum';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/guard/roles.guard';
import { DocumentUploadDto } from './dto/documnet-upload.dto';
import { fileMimetypeFilter } from 'src/utils/file-mimetype-validators';

@Controller('documents')
@ApiBearerAuth()
export class DocumentManagementController {
  constructor(private readonly service: DocumentManagementService) {}

  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileMimetypeFilter(
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'application/pdf',
      ),
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async uploadDocument(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|pdf)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 10,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.service.createDocument({
      title: file?.originalname,
      filePath: file?.path,
    });
  }

  @Roles(RoleEnum.viewer, RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async getAllDocuments() {
    return this.service.getAllDocuments();
  }

  @Roles(RoleEnum.viewer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':id')
  async getDocumentById(@Param('id') id: number) {
    return this.service.getDocumentById(id);
  }

  @Roles(RoleEnum.editor)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  async updateDocument(
    @Param('id') id: number,
    @Body() updateDto: { title?: string; description?: string },
  ) {
    return this.service.updateDocument(id, updateDto);
  }

  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  async deleteDocument(@Param('id') id: number) {
    return this.service.deleteDocument(id);
  }
}
