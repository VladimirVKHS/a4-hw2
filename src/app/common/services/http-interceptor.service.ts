import { Injectable } from '@angular/core';
import {
  HttpErrorResponse, HttpEvent,
  // HttpErrorResponse,
//  HttpEvent,
  HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  public intercept<T extends { data: any }>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const headers: HttpHeaders = req.headers.append('Content-Type', 'application/json');
    const jsonReq: HttpRequest<T> = req.clone({ headers });
    let response: any = jsonReq;
    if (jsonReq instanceof HttpResponse) {
      response =  Object.assign(
          jsonReq,
          { body: jsonReq.body && jsonReq.body.data }
      );
    }
    return next.handle(response);
  }

}
