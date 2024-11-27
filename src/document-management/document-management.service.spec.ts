import { Test, TestingModule } from '@nestjs/testing';
import { DocumentManagementService } from './document-management.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';

describe('DocumentManagementService', () => {
  let service: DocumentManagementService;
  let documentRepository: Repository<Document>;

  const mockDocumentRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentManagementService,
        {
          provide: getRepositoryToken(Document),
          useValue: mockDocumentRepository,
        },
      ],
    }).compile();

    service = module.get<DocumentManagementService>(DocumentManagementService);
    documentRepository = module.get<Repository<Document>>(
      getRepositoryToken(Document),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a document', async () => {
    const document = { title: 'test.pdf', filePath: './uploads/test.pdf' };
    mockDocumentRepository.create.mockReturnValue(document);
    mockDocumentRepository.save.mockResolvedValue(document);

    const result = await service.createDocument(document);
    expect(result).toEqual(document);
    expect(mockDocumentRepository.save).toHaveBeenCalledWith(document);
  });

  it('should return all documents', async () => {
    const documents = [{ title: 'test.pdf', filePath: './uploads/test.pdf' }];
    mockDocumentRepository.find.mockResolvedValue(documents);

    const result = await service.getAllDocuments();
    expect(result).toEqual(documents);
  });

  it('should return a document by ID', async () => {
    const document = { title: 'test.pdf', filePath: './uploads/test.pdf' };
    mockDocumentRepository.findOneBy.mockResolvedValue(document);

    const result = await service.getDocumentById(1);
    expect(result).toEqual(document);
  });

  it('should update a document', async () => {
    const updatedDocument = { title: 'updated-test.pdf' };
    mockDocumentRepository.update.mockResolvedValue(updatedDocument);
    mockDocumentRepository.findOneBy.mockResolvedValue(updatedDocument);

    const result = await service.updateDocument(1, updatedDocument);
    expect(result).toEqual(updatedDocument);
  });

  it('should throw error if document not found while deleting', async () => {
    mockDocumentRepository.findOneBy.mockResolvedValue(null);

    await expect(service.deleteDocument(1)).rejects.toThrow(
      'Document not found',
    );
  });

  it('should delete a document', async () => {
    const document = {
      id: 1,
      title: 'test.pdf',
      filePath: './uploads/test.pdf',
    };
    mockDocumentRepository.findOneBy.mockResolvedValue(document);
    mockDocumentRepository.remove.mockResolvedValue(document);

    const result = await service.deleteDocument(1);
    expect(result).toEqual(document);
  });
});
