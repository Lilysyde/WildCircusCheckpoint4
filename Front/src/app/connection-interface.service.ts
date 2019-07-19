import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConnectionInterfaceService {

  constructor(private http : HttpClient) {
   }

   getInterface():Observable<any> {
     return this.http.get<any>('http://localhost:2400/session')
   }
   postInterface(formData):Observable<any>{
     return this.http.post<any>('http://localhost:2400/session',formData)
   }
   deleteSession(id: number):Observable<any>{
    return this.http.delete<any>(`http://localhost:2400/session/${id}`)
}
postAchat(formData):Observable<any>{
  return this.http.post<any>('http://localhost:2400/ticket',formData)
}
getAchat():Observable<any>{
  return this.http.get<any>('http://localhost:2400/ticket')
}
deleteAchat(id: number):Observable<any>{
  return this.http.delete<any>(`http://localhost:2400/ticket/${id}`)
}
}