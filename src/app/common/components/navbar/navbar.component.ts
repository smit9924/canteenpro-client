import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { CONTACT_US_PAGE, CUSTOMER_LOGIN_PAGE, FODD_ITEM_CART_PAGE, LOGIN_PAGE, SIGNUP_PAGE } from '../../appConstants';
import { CommonModule } from '@angular/common';
import { BasePageComponent } from '../base-page/base-page.component';
import { AuthService } from '../../../services/auth.service';
import { isNullOrUndefined } from '../../utils';
import { PrimaryButtonComponent } from '../button/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../button/secondary-button/secondary-button.component';
import { USER_ROLES } from '../../appEnums';
import { NavbarService } from '../../../services/navbar.service';
import { DataService } from '../../../services/data.service';
import { ICartItems } from '../../models/interfaces';

const USER_LISTING_DROPDOWN = [
  {
    title: "Admin",
    path: "users/admin",
    allowedUser: [USER_ROLES.ADMIN]
  },
  {
    title: "Owner",
    path: "users/owner",
    allowedUser: [USER_ROLES.ADMIN, USER_ROLES.OWNER]
  },
  {
    title: "Manager",
    path: "users/manager",
    allowedUser: [USER_ROLES.ADMIN, USER_ROLES.OWNER, USER_ROLES.MANAGER]
  },
  {
    title: "Kitchen staff",
    path: "users/kitchener",
    allowedUser: [USER_ROLES.ADMIN, USER_ROLES.OWNER, USER_ROLES.MANAGER]
  },
  {
    title: "Canteen",
    path: "canteen",
    allowedUser: [USER_ROLES.ADMIN]
  },
  {
    title: "Food items",
    path: "food-items",
    allowedUser: [USER_ROLES.OWNER, USER_ROLES.MANAGER]
  },
  {
    title: "QR Codes",
    path: "qr",
    allowedUser: [USER_ROLES.ADMIN, USER_ROLES.OWNER, USER_ROLES.MANAGER]
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
export class NavbarComponent extends BasePageComponent implements OnInit {
  @ViewChild('navbar') navbar!: ElementRef;
  public LOGIN_PAGE = LOGIN_PAGE;
  public CUSTOMER_LOGIN_PAGE = CUSTOMER_LOGIN_PAGE;
  public SIGNUP_PAGE = SIGNUP_PAGE;
  public CONTACT_US_PAGE = CONTACT_US_PAGE;
  public FODD_ITEM_CART_PAGE = FODD_ITEM_CART_PAGE;
  public USER_ROLES = USER_ROLES;
  public isNullOrUndefined = isNullOrUndefined;
  public showProfileDropdown: boolean = false;
  public showSidebar: boolean = false
  public cartItemsCount: number = 0;
  private profileDropdownClickListener: any = null;
  public userDropdownOptions: any;

  constructor(
    public authService: AuthService,
    protected navbarService: NavbarService,
    protected dataService: DataService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.dataService.cartItemCountEmitter.subscribe(cartItemsCount => {
      this.cartItemsCount = cartItemsCount;
    });
    this.setUserDropdownOptions();
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

  public setUserDropdownOptions(): void {
    const userRole = this.authService.getRole();
    if(userRole === null) {
      this.userDropdownOptions = [];
    } else {
      this.userDropdownOptions = USER_LISTING_DROPDOWN.filter(option => {
        return option.allowedUser.includes(userRole);
      })
    }
  }
}
