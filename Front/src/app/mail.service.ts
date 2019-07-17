import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http:HttpClient) { }

  sendMail(formData):Observable<any>{
   return this.http.post<any>('http://localhost:2400/contact',formData)
  }
}
