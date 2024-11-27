import { Test, TestingModule } from '@nestjs/testing';
import { IngestionController } from './ingestion.controller';
import { IngestionService } from './ingestion.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('IngestionController', () => {
  let controller: IngestionController;
  let service: IngestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngestionController],
      providers: [
        IngestionService,
        {
          provide: IngestionService,
          useValue: {
            triggerIngestion: jest.fn(),
            getIngestionStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<IngestionController>(IngestionController);
    service = module.get<IngestionService>(IngestionService);
  });

  describe('triggerIngestion', () => {
    it('should trigger ingestion and return a success message', async () => {
      const triggerIngestionDto: any = { someData: 'value' };
      const responseData = { message: 'Ingestion triggered successfully' };

      jest.spyOn(service, 'triggerIngestion').mockResolvedValue(responseData);

      const result = await controller.triggerIngestion(triggerIngestionDto);

      expect(result).toEqual({
        message: 'Ingestion triggered successfully',
        result: responseData,
      });
      expect(service.triggerIngestion).toHaveBeenCalledWith(
        triggerIngestionDto,
      );
    });

    it('should throw an error if ingestion fails', async () => {
      const triggerIngestionDto: any = { someData: 'value' };
      const errorMessage = 'Ingestion failed';

      jest
        .spyOn(service, 'triggerIngestion')
        .mockRejectedValue(new Error(errorMessage));

      try {
        await controller.triggerIngestion(triggerIngestionDto);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.message).toBe(errorMessage);
        expect(e.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('getIngestionStatus', () => {
    it('should return the ingestion status', async () => {
      const ingestionId = '123';
      const statusData = { status: 'success' };

      jest.spyOn(service, 'getIngestionStatus').mockResolvedValue(statusData);

      const result = await controller.getIngestionStatus(ingestionId);

      expect(result).toEqual({ ingestionId, status: statusData });
      expect(service.getIngestionStatus).toHaveBeenCalledWith(ingestionId);
    });

    it('should throw an error if the status retrieval fails', async () => {
      const ingestionId = '123';
      const errorMessage = 'Failed to fetch ingestion status';

      jest
        .spyOn(service, 'getIngestionStatus')
        .mockRejectedValue(new Error(errorMessage));

      try {
        await controller.getIngestionStatus(ingestionId);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.message).toBe(errorMessage);
        expect(e.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
});
