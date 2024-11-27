import { Test, TestingModule } from '@nestjs/testing';
import { IngestionService } from './ingestion.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('IngestionService', () => {
  let service: IngestionService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngestionService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IngestionService>(IngestionService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('triggerIngestion', () => {
    it('should trigger ingestion and return data', async () => {
      const triggerIngestionDto: any = { someData: 'value' };
      const responseData: any = { message: 'Ingestion triggered successfully' };
      const mockResponse: any = {
        data: responseData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      jest.spyOn(httpService, 'post').mockReturnValue(of(mockResponse));

      const result = await service.triggerIngestion(triggerIngestionDto);

      expect(result).toEqual(responseData);
      expect(httpService.post).toHaveBeenCalledWith(
        `${process.env.PYTHON_BACKEND_URL}/api/trigger-ingestion`,
        triggerIngestionDto,
      );
    });
  });
});
