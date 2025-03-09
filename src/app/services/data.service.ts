import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER_ROLES } from '../common/appEnums';
import { USER_ROLES_API } from '../common/apiConstants';
import { IAPIResponse, IRoleList } from '../common/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userRoles: IRoleList[] | null = null;

  constructor(
    private http: HttpClient,
  ) {
  }

  public post(url: string, data: any = null): Promise<any> {
    return this.http.post(url, data).toPromise();
  }

  public put(url: string, data: any = null): Promise<any> {
    return this.http.put(url, data).toPromise();
  }

  public get(url: string, data: any = null): Promise<any> {
    return this.http.get(url).toPromise();
  }

  public delete(url: string): Promise<any> {
    return this.http.delete(url).toPromise();
  }


  public async getUserRoles(): Promise<IRoleList[] | null> {
    if (this.userRoles != null && this.userRoles.length != 0) {
      return this.userRoles;
    }
    await this.fetchUserRoles();
    return this.userRoles;
  }

  private fetchUserRoles(): Promise<void> {
    return this.get(USER_ROLES_API)
      .then((response: IAPIResponse<IRoleList[]>) => {
        this.userRoles = response.data;
      })
      .catch(e => {
        console.error(e);
      });
  }
}
