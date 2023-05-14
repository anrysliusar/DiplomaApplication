import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthResponse, UserLoginModel, UserRegisterModel} from "../../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient) {
  }

  login(user: UserLoginModel): Observable<AuthResponse> {
    const headers = this.configHeaders();
    return this.http.post<AuthResponse>(`auth/login`, user, {headers: headers});
  }

  register(user: UserRegisterModel): Observable<AuthResponse> {
    const headers = this.configHeaders();
    return this.http.post<AuthResponse>(`auth/register`, user, {headers: headers});
  }

  logout(): void {

  }


  configHeaders() {
    return {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };
  }
}
