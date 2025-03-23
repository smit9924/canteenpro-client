import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private showNavigation: boolean = true;
  private showEmptyNavigation: boolean = true;

  constructor() { }

  public showNavbar(): void {
    this.showNavigation = true;
    this.showEmptyNavigation = false;
  }

  public hideNavbar(): void {
    this.showNavigation = false;
  }

  public showEmptyNavbar(): void {
    this.showNavigation = true;
    this.showEmptyNavigation = false;
  }

  public get navbarVisible(): boolean {
    return this.showNavigation;
  }

  public get emptyNavbarVisible(): boolean {
    return this.showEmptyNavigation;
  }
}
