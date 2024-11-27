import { Test, TestingModule } from '@nestjs/testing';
import { DocumentManagementController } from './document-management.controller';
import { DocumentManagementService } from './document-management.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/guard/roles.guard';

describe('DocumentManagementController', () => {
  let controller: DocumentManagementController;
  let service: DocumentManagementService;

  const mockDocumentService = {
    createDocument: jest.fn(),
    getAllDocuments: jest.fn(),
    getDocumentById: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentManagementController],
      providers: [
        {
          provide: DocumentManagementService,
          useValue: mockDocumentService,
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<DocumentManagementController>(
      DocumentManagementController,
    );
    service = module.get<DocumentManagementService>(DocumentManagementService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should upload a document', async () => {
    const file: any = {
      fieldname: 'file',
      originalname: 'test.pdf',
    };
    mockDocumentService.createDocument.mockResolvedValue(file);
    expect(await controller.uploadDocument(file)).toEqual(file);
  });

  it('should return all documents', async () => {
    const documents = [{ title: 'test.pdf', filePath: './uploads/test.pdf' }];
    mockDocumentService.getAllDocuments.mockResolvedValue(documents);
    expect(await controller.getAllDocuments()).toEqual(documents);
  });

  it('should return document by ID', async () => {
    const document = { title: 'test.pdf', filePath: './uploads/test.pdf' };
    mockDocumentService.getDocumentById.mockResolvedValue(document);
    expect(await controller.getDocumentById(1)).toEqual(document);
  });

  it('should update a document', async () => {
    const updatedDocument = { title: 'updated-test.pdf' };
    mockDocumentService.updateDocument.mockResolvedValue(updatedDocument);
    expect(await controller.updateDocument(1, updatedDocument)).toEqual(
      updatedDocument,
    );
  });

  it('should delete a document', async () => {
    mockDocumentService.deleteDocument.mockResolvedValue(undefined);
    expect(await controller.deleteDocument(1)).toBeUndefined();
  });
});
