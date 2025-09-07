import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { LogoInfo } from '../shared/models/logo-info.model';
import LogData from '../shared/models/log-data.model';
import { LogService } from './log.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LogoService {
  private baseUrl = `${environment.baseApiUrl}/logo`;
  private uploadsUrl = environment.uploadsUrl;

  constructor(
    private http: HttpClient,
    private log: LogService,
    private auth: AuthService
  ) {}

  async getLogos(): Promise<LogoInfo[]> {
    const logos = await lastValueFrom(this.http.get<LogoInfo[]>(this.baseUrl));
    logos.forEach((logo) => {
      if (logo.url.startsWith('/')) {
        logo.url = this.uploadsUrl + logo.url;
      }
    });
    return logos;
  }

  async getLogoByType(type: string): Promise<LogoInfo> {
    const logo = await lastValueFrom(
      this.http.get<LogoInfo>(`${this.baseUrl}/${type}`)
    );
    if (logo.url.startsWith('/')) {
      logo.url = this.uploadsUrl + logo.url;
    }
    return logo;
  }

  async uploadLogo(type: string, file: File): Promise<any> {
    const formData = new FormData();
    formData.append('type', type);
    formData.append('files', file);

    try {
      const response = await lastValueFrom(
        this.http.post(`${this.baseUrl}/upload`, formData)
      );
      const logData: LogData = {
        timeStamp: new Date().toISOString(),
        infoType: 'uploadLogo',
        fileName: file.name,
        userName: this.auth.getUserName(),
      };
      await this.log.addLog(logData);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async uploadMultiple(formData: FormData): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.http.post(`${this.baseUrl}/upload`, formData)
      );

      const fileNames: string[] = [];
      for (const val of formData.values()) {
        if (val instanceof File) {
          fileNames.push(val.name);
        }
      }

      const logData: LogData = {
        timeStamp: new Date().toISOString(),
        infoType: 'uploadLogos',
        fileNames,
        userName: this.auth.getUserName(),
      };
      await this.log.addLog(logData);

      return response;
    } catch (err) {
      throw err;
    }
  }

  async deleteLogo(type: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.http.delete(`${this.baseUrl}/${type}`)
      );

      const logData: LogData = {
        timeStamp: new Date().toISOString(),
        infoType: 'deleteLogo',
        fileName: type,
        userName: this.auth.getUserName(),
      };
      await this.log.addLog(logData);

      return response;
    } catch (err) {
      throw err;
    }
  }
}
