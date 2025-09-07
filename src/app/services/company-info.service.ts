import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CompanyInfo from '../shared/models/company-info.model';
import { environment } from '../../environments/environment.development';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import Details from '../shared/models/details.model';
import LogData from '../shared/models/log-data.model';
import { LogService } from './log.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyInfoService {
  constructor(private http: HttpClient, private log: LogService, private auth: AuthService) {}

  async getCompanyInfo(): Promise<CompanyInfo> {
    try {
      return await lastValueFrom(
        this.http.get<CompanyInfo>(
          `${environment.baseApiUrl}/info/company-info`
        )
      );
    } catch (err: unknown) {
      console.error('Error while retrieving company info:', err);
      throw err;
    }
  }

  async updateCompanyInfo(companyInfo: CompanyInfo): Promise<void> {
    try {
      await firstValueFrom(
        this.http.put(
          `${environment.baseApiUrl}/info/company-info/update`,
          companyInfo
        )
      );
    } catch (err: unknown) {
      console.error('Error sending information:', err);
      throw err;
    }

    const newLog: LogData = {
      timeStamp: new Date().toISOString(),
      infoType: 'updateCompanyInfo',
      userName: this.auth.getUserName(),
      fileName: 'companyInfo'
    };

    try {
      await this.log.addLog(newLog);
    } catch (err) {
      console.warn('Failed to write log:', err);
    }
  }

  async getDetails(): Promise<Details> {
    try {
      return await lastValueFrom(
        this.http.get<Details>(`${environment.baseApiUrl}/info/details`)
      );
    } catch (err: unknown) {
      console.error('Error while retrieving details:', err);
      throw err;
    }
  }

  async updateDetails(details: Details): Promise<void> {
    try {
      await firstValueFrom(
        this.http.put(`${environment.baseApiUrl}/info/details/update`, details)
      );
    } catch (err: unknown) {
      console.error('Error sending information:', err);
      throw err;
    }

    const newLog: LogData = {
      timeStamp: new Date().toISOString(),
      infoType: 'updateDetails',
      userName: this.auth.getUserName(),
      fileName: 'details'
    };

    try {
      await this.log.addLog(newLog);
    } catch (err) {
      console.warn('Failed to write log:', err);
    }
  }
}
