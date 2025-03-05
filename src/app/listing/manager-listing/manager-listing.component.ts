import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PrimaryButtonComponent } from '../../common/components/button/primary-button/primary-button.component';
import { CREATE_MANAGER_PAGE, QUERY_PARAM_KEY_GUID } from '../../common/appConstants';
import { DataService } from '../../services/data.service';
import { MANAGER_LISTING, UPDATE_USER, USER_CRUD_BASE_URL } from '../../common/apiConstants';
import { IAPIResponse, IToastEventData, IUserListing } from '../../common/models/interfaces';
import { isNullOrUndefined } from '../../common/utils';
import { ToastService } from '../../services/toast.service';
import { PopupComponent } from '../../common/components/popup/popup.component';
import { TOAST_TYPE } from '../../common/appEnums';

const CLASS_HIDDEN = 'hidden';
const DELETED_SUCCESS_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "User deleted successfully!"
}

@Component({
  selector: 'app-manager-listing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PrimaryButtonComponent,
    PopupComponent
  ],
  templateUrl: './manager-listing.component.html',
  styleUrl: './manager-listing.component.scss'
})
export class ManagerListingComponent implements OnInit{
  @ViewChild('parentElement') parentElement!: ElementRef;
  public userListingData: IUserListing[] = [];
  public actionMenuClickListener: any;
  public isActionMenuVisible: boolean = false;
  public menu!: Element;
  public errorPopupHeading: string = "Error!";
  public errorPopupText: string = "";
  public showPopup: EventEmitter<boolean> = new EventEmitter<boolean>;

  constructor(
    private router: Router,
    private dataService: DataService,
    private toastService: ToastService
  ){}

  public ngOnInit(): void {
    this.fetchListingData();
  }

  public fetchListingData(): void {
    this.dataService.get(MANAGER_LISTING)
      .then((response: IAPIResponse<IUserListing[]>) => {
        if(!response.success) {
          throw Error;
        }
        this.userListingData = response.data;
      })
      .catch((ex) => {
        console.error(ex.error.message)
      });
  }

  public onCreatenewManagerClick() {
    this.router.navigateByUrl(CREATE_MANAGER_PAGE);
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
    this.router.navigate([CREATE_MANAGER_PAGE], {queryParams: queryParameter})
  }
  
  public onMenuDeleteClick(guid: string) {
    this.dataService.delete(UPDATE_USER + `?guid=${guid}`)
      .then((response: IAPIResponse<IUserListing[]>) => {
        if(!response.success) {
          throw Error;
        }
        this.userListingData = response.data;
        this.toastService.enque(DELETED_SUCCESS_TOAST_DATA);
      })
      .catch(e => {
        this.displayPopup(this.errorPopupHeading, e.error.message);
      })
  }
}
