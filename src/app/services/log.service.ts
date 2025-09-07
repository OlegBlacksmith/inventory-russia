import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import LogData from '../shared/models/log-data.model';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private http: HttpClient) {}

  async getAllLogs(): Promise<LogData[]> {
    try {
      return await firstValueFrom(
        this.http.get<LogData[]>(`${environment.baseApiUrl}/logs`)
      );
    } catch (err: unknown) {
      console.error(`Error while loading logs: ${err}`);
      throw err;
    }
  }

  async addLog(log: LogData): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post(`${environment.baseApiUrl}/logs`, log)
      );
    } catch (err: unknown) {
      console.error('Error while adding logs:', JSON.stringify(err, null, 2));
      throw err;
    }
  }

  async getLogByType(type: string): Promise<LogData | null> {
    try {
      return await firstValueFrom(
        this.http.get<LogData>(`${environment.baseApiUrl}/logs/by-type/${type}`)
      );
    } catch (err: any) {
      if (err.status === 404) return null;
      throw err;
    }
  }

  async getLogByFileName(fileName: string): Promise<LogData | null> {
    try {
      return await firstValueFrom(
        this.http.get<LogData>(
          `${environment.baseApiUrl}/logs/by-file/${fileName}`
        )
      );
    } catch (err: any) {
      if (err.status === 404) return null;
      throw err;
    }
  }
}
