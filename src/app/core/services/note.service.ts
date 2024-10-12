import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/enironment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _HttpClient:HttpClient) { }

  getUserNotes():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/notes`)
  }

  addNote(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/notes` , data)
  }
  updateNote(id:string ,data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/notes/${id}` , data)
  }
  deleteNote(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/notes/${id}`)
  }
}
