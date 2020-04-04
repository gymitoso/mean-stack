import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpParams } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  // function to set the header in every request
  private setHeaders(header: Map<string, string>): HttpHeaders {
    const headersConfig: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    const token = this.localStorage.retrieve('token');
    if (!!token) {
      headersConfig.Authorization = 'Bearer ' + token;
    }

    if (header) {
      header.forEach((value, key) => {
        headersConfig[key] = value;
      });
    }

    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    return throwError(error);
  }

  get(path: string, options?: HttpParams, header?: Map<string, string> ): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, {headers: this.setHeaders(header), params: options}).pipe(
      retry(2),
      catchError(this.formatErrors),
      map((res: HttpResponse<Response>) => res)
    );
  }

  put(path: string, body: object = {}, header?: Map<string, string>): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      {headers: this.setHeaders(header)}
    ).pipe(
      catchError(this.formatErrors),
      map((res: HttpResponse<Response>) => res)
    );
  }

  post(path: string, body: object = {}, header?: Map<string, string>): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      {headers: this.setHeaders(header)}
    ).pipe(
      catchError(this.formatErrors),
      map((res: HttpResponse<Response>) => res)
    );
  }

  delete(path, header?: Map<string, string>): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${path}`,
      {headers: this.setHeaders(header)}
    ).pipe(
      catchError(this.formatErrors),
      map((res: HttpResponse<Response>) => res)
    );
  }
}
