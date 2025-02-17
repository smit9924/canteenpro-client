import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { LOGIN_PAGE, SIGNUP_PAGE } from '../../appConstants';
import { CommonModule } from '@angular/common';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    SidebarComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent extends BasePageComponent {
  public LOGIN_PAGE = LOGIN_PAGE;
  public SIGNUP_PAGE = SIGNUP_PAGE;
  public showProfileDropdown: boolean = false;
  public showSidebar: boolean = false

  public toggleProfileDropdown(): void {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  public toggleSidebar():void {
    this.showSidebar = !this.showSidebar;
  }
}
