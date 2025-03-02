import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LOCAL_STORAGE_TOKEN, LOGIN_PAGE } from '../common/appConstants';
import { jwtDecode } from 'jwt-decode';
import { isNullOrEmpty } from '../common/utils';
import { USER_ROLES } from '../common/appEnums';
import { IJwtDecodedData } from '../common/models/interfaces';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  public isLoggedIn(): boolean {
    if(!isNullOrEmpty(this.localStorageService.get(LOCAL_STORAGE_TOKEN) as string)) {
      const token = this.localStorageService.get(LOCAL_STORAGE_TOKEN) as string;
      const exp_time = jwtDecode(token).exp as number;
      // Reduce precision from milisecond to second to match jwt token expiration time precision
      const current_time = Math.floor(Date.now() / 1000);
      if(exp_time > current_time) {
        return true;
      }
    }
    return false;
  }

  public authenticateUser(token: string): boolean {
    if(!isNullOrEmpty(token)) {
      const decodedToken = jwtDecode(token) as IJwtDecodedData
      const exp_time = decodedToken.exp;
      // Reduce precision from milisecond to second to match jwt token expiration time precision
      const current_time = Math.floor(Date.now() / 1000);

      if(exp_time > current_time) {
        this.localStorageService.set(LOCAL_STORAGE_TOKEN, token);
        return true;
      }
    }
    return false;
  }

  public logout() {
    this.localStorageService.delete(LOCAL_STORAGE_TOKEN);
    this.router.navigateByUrl(LOGIN_PAGE);
  }

  public getToken(): string | null {
    if(this.isLoggedIn()) {
      return this.localStorageService.get(LOCAL_STORAGE_TOKEN);
    }
    return null;
  }

  public getRole(): USER_ROLES | void {
    if(this.isLoggedIn()) {
      const token = this.localStorageService.get(LOCAL_STORAGE_TOKEN) as string;
      const decodedToken = jwtDecode(token) as IJwtDecodedData;
      return decodedToken.role;
    }
  }
}