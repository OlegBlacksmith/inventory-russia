import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendEmailWFile(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:3000/send-email-w-file', formData);
  }

  sendEmailReg(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:3000/send-email-reg', formData);
  }
}
