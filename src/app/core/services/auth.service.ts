import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/enironment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient : HttpClient , private _Router : Router) { }

  signUp(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/users/signUp` , data)
  }

  login(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/users/signIn` , data)
  }
  logOut():void{
    localStorage.removeItem('tokenToDo');
    this._Router.navigate(['/login']);
    
  }

}
