import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthStoreService} from "../store/auth-store.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private BASE_URL = "http://localhost:8080/api/";
  private authToken: string;

  constructor(private authService: AuthStoreService) {
    authService.authToken$.subscribe(token => {
      this.authToken = token;
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const params = {
      url: this.BASE_URL + request.url,
      headers: this.getHeaders(request),
      params: request.params
    }
    request = request.clone(params);
    return next.handle(request);
  }

  private getHeaders(request: HttpRequest<unknown>) {
    if (request.url.startsWith('auth')) {
      return request.headers;
    }
    return request.headers.append('Authorization', 'Bearer ' + this.authToken);
  }
}
