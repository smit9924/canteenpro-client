import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER_ROLES } from '../common/appEnums';
import { USER_ROLES_API } from '../common/apiConstants';
import { IAPIResponse, IRoleList } from '../common/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userRoles: USER_ROLES[] = [];

  constructor(
    private http: HttpClient,
  ) {
    // this.setUserRolesList();
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

  public async setUserRolesList(): Promise<void> {
    try {
      const response: IAPIResponse<IRoleList[]> = await this.get(USER_ROLES_API);
      this.userRoles = response.data.map((userRole) => userRole.role);
    } catch (ex) {
      console.error("Error fetching user roles:", ex);
    }
  }

  // public getUserRoles() {
  //   if(this.userRoles.length === 0) {
  //     this.get(USER_ROLES_API)
  //     .then((response: IAPIResponse<IRoleList[]>) => {
  //       const userRoles: USER_ROLES[] = [];
  //       response.data.map((userRole) => {
  //         userRoles.push(userRole.role);
  //       })
  //       this.userRoles = userRoles;
  //     })
  //     .then
  //     .catch((ex) => {
  //       console.error(ex);
  //       return
  //     });
  //   } else {
  //     return this.userRoles;
  //   }
  // }

  // public setUserRolesList() {
  //   this.get(USER_ROLES_API)
  //     .then((response: IAPIResponse<IRoleList[]>) => {
  //       const userRoles: USER_ROLES[] = [];
  //       response.data.map((userRole) => {
  //         userRoles.push(userRole.role);
  //       })
  //       this.userRoles = userRoles;
  //       return this.userRoles;
  //     })
  //     .catch((ex) => {
  //       console.error(ex);
  //     });
  // }
}
