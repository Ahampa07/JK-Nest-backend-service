import { Module } from '@nestjs/common';
import { DocumentManagementController } from './document-management.controller';
import { DocumentManagementService } from './document-management.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  controllers: [DocumentManagementController],
  providers: [DocumentManagementService]
})
export class DocumentManagementModule {}
