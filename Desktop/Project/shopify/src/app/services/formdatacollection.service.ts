import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FormdatacollectionService {

  apiUrl: string = "http://localhost:3000/users"

  constructor() { }

  http: HttpClient = inject(HttpClient)

  postData(formData: any): Observable<any>{
    return this.http.post(this.apiUrl, formData)
  }

  isDuplicate(username: string): boolean {
    const existing = ['admin', 'user']
    return existing.includes(username.toLocaleLowerCase())
  }
  
}
