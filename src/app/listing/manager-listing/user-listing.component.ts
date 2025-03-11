import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PrimaryButtonComponent } from '../../common/components/button/primary-button/primary-button.component';
import { CREATE_USER_BASE_ROUTE, ERROR_PAGE, QUERY_PARAM_KEY_GUID, QUERY_PARAM_ROLE } from '../../common/appConstants';
import { DataService } from '../../services/data.service';
import { API_USER_CRUD, API_USER_LISTING } from '../../common/apiConstants';
import { IAPIResponse, IToastEventData, IUserListing } from '../../common/models/interfaces';
import { isNullOrUndefined } from '../../common/utils';
import { ToastService } from '../../services/toast.service';
import { PopupComponent } from '../../common/components/popup/popup.component';
import { TOAST_TYPE } from '../../common/appEnums';
import { PreLoaderService } from '../../services/pre-loader.service';

const CLASS_HIDDEN = 'hidden';
const DELETED_SUCCESS_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "User deleted successfully!"
}

@Component({
  selector: 'app-user-listing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PrimaryButtonComponent,
    PopupComponent
  ],
  templateUrl: './user-listing.component.html',
  styleUrl: './user-listing.component.scss'
})
export class UserListingComponent implements OnInit{
  @ViewChild('parentElement') parentElement!: ElementRef;
  public userListingData: IUserListing[] = [];
  public actionMenuClickListener: any;
  public isActionMenuVisible: boolean = false;
  public menu!: Element;
  public errorPopupHeading: string = "Error!";
  public errorPopupText: string = "";
  public showPopup: EventEmitter<boolean> = new EventEmitter<boolean>;
  public role: string | null = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastService: ToastService,
    private preloaderService: PreLoaderService
  ){}

  public async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (param) => {
      this.role = this.route.snapshot.paramMap.get(QUERY_PARAM_ROLE);
      await this.validateUserRole(this.role);

      this.fetchListingData(); 
    })

  }

  public async validateUserRole(userRole: string | null) {
    const userRoleList = await this.dataService.getUserRoles();
    const isRoleValid = userRoleList?.some(role => role.role === userRole);
    if(userRole === null || !isRoleValid) {
      this.router.navigateByUrl(ERROR_PAGE);
    }
  }

  public get listingApiUrl(): string {
    return API_USER_LISTING + this.role;
  }

  public fetchListingData(): void {
    this.preloaderService.show();
    this.dataService.get(this.listingApiUrl)
      .then((response: IAPIResponse<IUserListing[]>) => {
        if(!response.success) {
          throw Error;
        }
        this.userListingData = response.data;
        this.preloaderService.hide();
      })
      .catch((ex) => {
        console.error(ex.error.message);
        this.preloaderService.hide();
      });
  }

  public onCreateNewUserClick() {
    this.router.navigateByUrl(CREATE_USER_BASE_ROUTE + this.role);
  }

  public onDeleteClick() {
    console.log('delete button clicked');
  }

  public menuBtnClick(event: MouseEvent, guid: string) {
    // If action menu is already open and user try to open another menu then close previous menu
    if(!isNullOrUndefined(this.actionMenuClickListener) && !isNullOrUndefined(this.menu)) {
      this.menu?.classList.add(CLASS_HIDDEN)
      document.removeEventListener("click", this.actionMenuClickListener);
    }

    this.isActionMenuVisible = true;
    let menuElement = (this.parentElement?.nativeElement as HTMLElement)?.querySelector('#menu-' + guid);
    
    if(menuElement !== null) {
      this.menu = menuElement;
      this.menu.classList.remove(CLASS_HIDDEN);

      // Add timeout to prevent immidiate execution of event handler due to event propogation
      setTimeout(() => {
        if(this.menu !== null) {
          this.actionMenuClickListener = (event: MouseEvent) => this.profileDropdownClickListenerHandler(event, this.menu);
          document.addEventListener("click", this.actionMenuClickListener)
        }
      })
    }
  }

  public profileDropdownClickListenerHandler(event: MouseEvent, menu: Element): any {
    const rect = menu.getBoundingClientRect();
    
    if(!(event.clientX > rect.left && event.clientX < rect.right &&
      event.clientY > rect.top && event.clientY < rect.bottom)) {
        if(this.isActionMenuVisible) {
          this.isActionMenuVisible = false;
          menu.classList.add(CLASS_HIDDEN);

          // Destroying event listener if user click outside the menu 
          if(!isNullOrUndefined(this.actionMenuClickListener)) {
            document.removeEventListener("click", this.actionMenuClickListener);
          }
        }
    }
  }

  public displayPopup(heading: string, message: string): void {
    this.errorPopupHeading = heading;
    this.errorPopupText = message;
    this.showPopup.emit(true);
  }
  
  public onMenuEditClick(guid: string) {
    const queryParameter = {
      [QUERY_PARAM_KEY_GUID]: guid
    }
    this.router.navigate([CREATE_USER_BASE_ROUTE + this.role], {queryParams: queryParameter})
  }
  
  public onMenuDeleteClick(guid: string) {
    this.preloaderService.show();
    this.dataService.delete(API_USER_CRUD + `?guid=${guid}`)
      .then((response: IAPIResponse<IUserListing[]>) => {
        if(!response.success) {
          throw Error;
        }
        this.userListingData = response.data;
        this.toastService.enque(DELETED_SUCCESS_TOAST_DATA);
        this.preloaderService.hide()
      })
      .catch(e => {
        this.displayPopup(this.errorPopupHeading, e.error.message);
        this.preloaderService.hide();
      })
  }

  public get createNewUserBtnLable(): string {
    const label = 'Create New ' + this.role;
    return label.toUpperCase();
  }

  public get pageHeading(): string {
    const heading = this.role + ' Listing';
    return heading;
  }
}
