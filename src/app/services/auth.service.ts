import { Injectable } from '@angular/core';
import { APP_API } from '../config/app-api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl=APP_API.apiUrl;
  constructor(private http:HttpClient) { }

  register(userData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}auth/register`, userData);
  }

  login(userData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}auth/login`,userData);
  }

}
