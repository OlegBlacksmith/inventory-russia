import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { AuthService } from './auth.service';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import LogData from '../shared/models/log-data.model';

@Injectable({
  providedIn: 'root',
})
export class GratitudesService {
  constructor(
    private http: HttpClient,
    private log: LogService,
    private auth: AuthService
  ) {}

  async getGratitudesList(): Promise<string[]> {
    try {
      return await lastValueFrom(
        this.http.get<string[]>(`${environment.baseApiUrl}/gratitudes`)
      );
    } catch (err: unknown) {
      console.error('Error while retrieving gratitudes:', err);
      throw err;
    }
  }

  async getGratitudeByName(fileName: string): Promise<Blob> {
    try {
      const response = await lastValueFrom(
        this.http.get(
          `${environment.baseApiUrl}/gratitudes/get-by-name/${fileName}`,
          { responseType: 'blob' }
        )
      );
      return response;
    } catch (err: unknown) {
      console.error('Error while retrieving gratitude file:', err);
      throw err;
    }
  }

  async deleteGratitudeByName(fileName: string): Promise<void> {
    try {
      await lastValueFrom(
        this.http.delete(
          `${environment.baseApiUrl}/gratitudes/delete-by-name/${fileName}`
        )
      );
    } catch (err) {
      console.error('Error while deleting gratitude file:', err);
      throw err;
    }

    const newLog: LogData = {
      timeStamp: new Date().toISOString(),
      infoType: 'deleteGratitude',
      fileName: fileName,
      userName: this.auth.getUserName(),
    };

    try {
      await this.log.addLog(newLog);
    } catch (err) {
      console.warn('Failed to write log:', err);
    }
  }

  async uploadGratitudes(formData: FormData): Promise<void> {
    const fileNames: string[] = [];
    for (const value of formData.values()) {
      if (value instanceof File) {
        fileNames.push(value.name);
      }
    }

    try {
      await lastValueFrom(
        this.http.post(`${environment.baseApiUrl}/gratitudes/upload`, formData)
      );
      console.log('Gratitude(s) uploaded successfully');
    } catch (err: unknown) {
      console.error(`Failed to upload gratitude(s): ${err}`);
      throw err;
    }

    const newLog: LogData = {
      timeStamp: new Date().toISOString(),
      infoType: 'uploadGratitude',
      userName: this.auth.getUserName(),
      ...(fileNames.length === 1
        ? { fileName: fileNames[0] }
        : { fileNames: fileNames }),
    };

    try {
      await this.log.addLog(newLog);
    } catch (err) {
      console.warn('Failed to write log:', err);
    }
  }
}
