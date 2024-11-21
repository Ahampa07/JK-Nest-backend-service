import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentManagementService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async createDocument(data: {
    title: string;
    filePath: string;
  }) {
    const document = this.documentRepository.create(data);
    return this.documentRepository.save(document);
  }

  async getAllDocuments() {
    return this.documentRepository.find();
  }

  async getDocumentById(id: number) {
    return this.documentRepository.findOneBy({ id });
  }

  async updateDocument(
    id: number,
    updateDto: { title?: string; description?: string },
  ) {
    await this.documentRepository.update(id, updateDto);
    return this.getDocumentById(id);
  }

  async deleteDocument(id: number) {
    const document = await this.getDocumentById(id);
    if (!document) throw new Error('Document not found');
    return this.documentRepository.remove(document);
  }
}
