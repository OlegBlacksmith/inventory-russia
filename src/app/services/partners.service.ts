import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LogService } from './log.service';
import LogData from '../shared/models/log-data.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PartnersService {
  constructor(
    private http: HttpClient,
    private log: LogService,
    private auth: AuthService
  ) {}

  async getPartnerPicsList(): Promise<string[]> {
    return await lastValueFrom(
      this.http.get<string[]>(`${environment.baseApiUrl}/partners`)
    );
  }

  async updatePartnerOrder(order: string[]): Promise<void> {
    await lastValueFrom(
      this.http.post<void>(`${environment.baseApiUrl}/partners/order`, order)
    );
  }

  async getPartnerByName(fileName: string): Promise<Blob> {
    try {
      const response = await lastValueFrom(
        this.http.get(
          `${environment.baseApiUrl}/partners/get-by-name/${fileName}`,
          {
            responseType: 'blob',
          }
        )
      );
      return response;
    } catch (err: unknown) {
      console.error('Error while retrieving partner image:', err);
      throw err;
    }
  }

  async deletePartnerByName(fileName: string): Promise<void> {
    try {
      await lastValueFrom(
        this.http.delete(
          `${environment.baseApiUrl}/partners/delete-by-name/${fileName}`
        )
      );
    } catch (err) {
      console.error('Error while deleting partner image:', err);
      throw err;
    }

    const newLog: LogData = {
      timeStamp: new Date().toISOString(),
      infoType: 'deletePartner',
      fileName: fileName,
      userName: this.auth.getUserName(),
    };

    try {
      await this.log.addLog(newLog);
    } catch (err) {
      console.warn('Failed to write log:', err);
    }
  }

  async uploadPartner(formData: FormData): Promise<void> {
    const fileNames: string[] = [];

    for (const value of formData.values()) {
      if (value instanceof File) {
        fileNames.push(value.name);
      }
    }

    try {
      await lastValueFrom(
        this.http.post(
          `${environment.baseApiUrl}/partners/upload-partners`,
          formData
        )
      );
      console.log('Partner added successfully');
    } catch (err: unknown) {
      console.error(`failed to add partner: ${err}`);
      throw err;
    }

    const newLog: LogData = {
      timeStamp: new Date().toISOString(),
      infoType: 'uploadPartner',
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
