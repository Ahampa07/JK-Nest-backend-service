import { Test, TestingModule } from '@nestjs/testing';
import { DocumentManagementController } from './document-management.controller';

describe('DocumentManagementController', () => {
  let controller: DocumentManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentManagementController],
    }).compile();

    controller = module.get<DocumentManagementController>(DocumentManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
