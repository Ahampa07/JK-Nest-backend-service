import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TriggerIngestionDto } from './dto/trigger-ingestion.dto';

@Injectable()
export class IngestionService {
  private readonly pythonBackendBaseUrl =
    process.env.PYTHON_BACKEND_URL || 'http://python-backend:5000';

  constructor(private readonly httpService: HttpService) {}

  async triggerIngestion(
    triggerIngestionDto: TriggerIngestionDto,
  ): Promise<any> {
    const url = `${this.pythonBackendBaseUrl}/api/trigger-ingestion`;
    const response = await firstValueFrom(
      this.httpService.post(url, triggerIngestionDto),
    );
    return response.data;
  }

  async getIngestionStatus(ingestionId: string): Promise<any> {
    const url = `${this.pythonBackendBaseUrl}/api/ingestion-status/${ingestionId}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
