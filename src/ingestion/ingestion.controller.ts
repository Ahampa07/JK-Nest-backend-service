import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { TriggerIngestionDto } from './dto/trigger-ingestion.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { RoleEnum } from 'src/roles/enum/roles.enum';


@Controller('ingestion')
@UseGuards(AuthGuard('jwt'))
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('trigger')
  @Roles(RoleEnum.admin, RoleEnum.editor)
  async triggerIngestion(@Body() triggerIngestionDto: TriggerIngestionDto) {
    try {
      const result = await this.ingestionService.triggerIngestion(
        triggerIngestionDto,
      );
      return { message: 'Ingestion triggered successfully', result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('status/:id')
  @Roles(RoleEnum.admin, RoleEnum.editor, RoleEnum.viewer)
  async getIngestionStatus(@Param('id') ingestionId: string) {
    try {
      const status = await this.ingestionService.getIngestionStatus(
        ingestionId,
      );
      return { ingestionId, status };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
