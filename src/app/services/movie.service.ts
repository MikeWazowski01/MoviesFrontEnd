import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  
  constructor(private _http: HttpClient) { }

  HttpGet(serviceName: string): Observable<any> {
    return this._http.get(serviceName);
  }

   HttpDelete(url: string): Observable<any> {
    let httpParams = new HttpParams();
    return this._http.delete<number>(url);
  }

  HttpPost(url: string,fromBody:any): Observable<any> {
    console.log(url)
    console.log(fromBody)
    let httpParams = new HttpParams();
     return this._http.post<any>(
       url, fromBody, { params: httpParams });
  }

   HttpPut(url: string,fromBody:any): Observable<any> {
    console.log(url)
    console.log(fromBody)
    let httpParams = new HttpParams();
     return this._http.put<any>(
       url, fromBody, { params: httpParams });
  }
}
