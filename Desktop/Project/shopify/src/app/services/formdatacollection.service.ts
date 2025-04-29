import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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


  isDuplicate(username: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.some(user => user.username.toLowerCase() === username.toLowerCase()))
    );
  }

  isEmailDuplicate(email: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.some(user => user.email.toLowerCase() === email.toLowerCase()))
    );
  }
  
}
