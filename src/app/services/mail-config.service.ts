import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { MailConfig } from '../shared/models/mail-config.model';

@Injectable({
  providedIn: 'root'
})
export class MailConfigService {

  private baseUrl = `${environment.baseApiUrl}/email-config`;

  constructor(private http: HttpClient) {}

  async getConfig(): Promise<MailConfig> {
    return await lastValueFrom(this.http.get<MailConfig>(this.baseUrl));
  }

  async updateConfig(type: 'orders' | 'vacancy', user: string, pass: string): Promise<any> {
    return await lastValueFrom(
      this.http.post(this.baseUrl, { type, user, pass })
    );
  }
}
