import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FormdatacollectionService {

  apiUrl: string = "http://localhost:3000/users"

  constructor() { }

  http: HttpClient = inject(HttpClient)

  postData(getdata: any) {
    this.http.post(this.apiUrl, getdata).subscribe()
  }

  
}
