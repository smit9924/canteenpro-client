import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { USER_ROLES } from '../common/appEnums';
import { API_CART_ITEM_CRUD, API_USER_PROFILE, USER_ROLES_API } from '../common/apiConstants';
import { IAPIResponse, ICartItems, IRoleList, IUserProfile } from '../common/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public cartItemCountEmitter: EventEmitter<number> = new EventEmitter<number>();
  private userRoles: IRoleList[] | null = null;
  private userProfileData: IUserProfile | null = null;
  private cartItemsList: ICartItems[] | null = null;

  constructor(
    private http: HttpClient,
  ) {
    this.fetchCartItemListData();
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

  // User profile data management
  public setUserProfileData(data: IUserProfile | null): void {
    this.userProfileData = data;
  }

  public async getUserProfileData(): Promise<IUserProfile | null> {
    if (this.userProfileData != null) {
      return this.userProfileData;
    }
    await this.fetchUserProfileData();
    return this.userProfileData;
  }

  private fetchUserProfileData(): Promise<void> {
    return this.get(API_USER_PROFILE)
      .then((response: IAPIResponse<IUserProfile>) => {
        this.userProfileData = response.data;
      })
      .catch(e => {
        console.error(e);
      });
  }
  // *** end ***

  // User cart data management
  public async updateCartItemListData() {
    await this.fetchCartItemListData();
  }

  public setCartItemsListData(data: ICartItems[] | null): void {
    this.cartItemsList = data;
    const cartItemCount = this.cartItemsList !== null ? this.cartItemsList.length : 0
    this.cartItemCountEmitter.emit(cartItemCount);
  }

  public async getCartItemListData(): Promise<ICartItems[] | null> {
    if (this.cartItemsList === null || this.cartItemsList.length === 0) {
      await this.fetchCartItemListData();
    }
    return this.cartItemsList;
  }

  private fetchCartItemListData(): Promise<void> {
    return this.get(API_CART_ITEM_CRUD)
      .then((response: IAPIResponse<ICartItems[]>) => {
        this.cartItemsList = response.data;
        this.cartItemCountEmitter.emit(this.cartItemsList.length);
      })
      .catch(e => {
        console.error(e);
      });
  }
  // *** end ***
}
