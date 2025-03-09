import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { LOGIN_PAGE, SIGNUP_PAGE } from '../../appConstants';
import { CommonModule } from '@angular/common';
import { BasePageComponent } from '../base-page/base-page.component';
import { AuthService } from '../../../services/auth.service';
import { isNullOrUndefined } from '../../utils';
import { PrimaryButtonComponent } from '../button/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../button/secondary-button/secondary-button.component';

const USER_LISTING_DROPDOWN = [
  {
    title: "Admin",
    path: "users/admin",
  },
  {
    title: "Owner",
    path: "users/owner",
  },
  {
    title: "Manager",
    path: "users/manager",
  },
  {
    title: "Kitchen staff",
    path: "users/kitchener",
  },
  {
    title: "Canteen",
    path: "canteen",
  },
  {
    title: "QR Codes",
    path: "qr",
  },
]

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    SidebarComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent extends BasePageComponent {
  @ViewChild('navbar') navbar!: ElementRef;
  public LOGIN_PAGE = LOGIN_PAGE;
  public SIGNUP_PAGE = SIGNUP_PAGE;
  public USER_LISTING_DROPDOWN = USER_LISTING_DROPDOWN;
  public showProfileDropdown: boolean = false;
  public showSidebar: boolean = false
  private profileDropdownClickListener: any = null;

  constructor(
    public authService: AuthService
  ) {
    super();
  }

  public toggleProfileDropdown(): void {
    this.showProfileDropdown = !this.showProfileDropdown;

    // Add click listener to close profile drop down when user click outside dropdown
    setTimeout(() => {
      const profileDropdown = (this.navbar.nativeElement as HTMLElement).querySelector('#profileDropdown');
      
      if(this.showProfileDropdown && profileDropdown) {
        const dropdownRect = profileDropdown.getBoundingClientRect();
        this.profileDropdownClickListener = (event: MouseEvent) => this.profileDropdownClickListenerHandler(event, dropdownRect);
      
        document.addEventListener("click", this.profileDropdownClickListener)
      }

      if(!isNullOrUndefined(this.profileDropdownClickListener) && !this.showProfileDropdown) {
        document.removeEventListener("click", this.profileDropdownClickListener);
      }
    })

  }

  public profileDropdownClickListenerHandler(event: MouseEvent, rect: DOMRect): any {
    if(!(event.clientX > rect.left && event.clientX < rect.right &&
      event.clientY > rect.top && event.clientY < rect.bottom)) {
        if(this.showProfileDropdown) {
          this.toggleProfileDropdown()
        }
    }
  }

  public toggleSidebar():void {
    this.showSidebar = !this.showSidebar;
  }

  public logoutButtonClick(): void {
    this.authService.logout();
  }
}
