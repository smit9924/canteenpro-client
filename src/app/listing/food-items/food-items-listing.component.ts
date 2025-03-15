import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { PrimaryButtonComponent } from '../../common/components/button/primary-button/primary-button.component';
import { DataService } from '../../services/data.service';
import { PreLoaderService } from '../../services/pre-loader.service';
import { IAPIResponse, ICategoryListing, IItemListing, IToastEventData, IUserListing } from '../../common/models/interfaces';
import { ITEM_LISTIN_TAB_TYPE, TOAST_TYPE } from '../../common/appEnums';
import { ToastService } from '../../services/toast.service';
import { API_CATEGORY_CRUD, API_CATEGORY_LISTING, API_FOOD_ITEM_CRUD } from '../../common/apiConstants';
import { CREATE_CATEGORY_PAGE, CREATE_FOOD_ITEM_PAGE, CREATE_USER_BASE_ROUTE, QUERY_PARAM_KEY_GUID } from '../../common/appConstants';
import { Router } from '@angular/router';
import { isNullOrUndefined } from '../../common/utils';

const CLASS_HIDDEN = 'hidden';
const CATEGORY_DELETED_SUCCESS_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "Category deleted successfully!"
}

const ITEM_DELETED_SUCCESS_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "Item deleted successfully!"
}

@Component({
  selector: 'app-food-items-listing',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent
  ],
  templateUrl: './food-items-listing.component.html',
  styleUrl: './food-items-listing.component.scss'
})
export class FoodItemsListingComponent implements OnInit {
  @ViewChild('parentElement') parentElement!: ElementRef;
  public ITEM_LISTIN_TAB_TYPE = ITEM_LISTIN_TAB_TYPE;
  public categoryListingData: ICategoryListing[] = [];
  public itemListingData: IItemListing[] = [];
  public errorPopupHeading: string = "Error!";
  public errorPopupText: string = "";
  public showPopup: EventEmitter<boolean> = new EventEmitter<boolean>;
  public activatedTab: ITEM_LISTIN_TAB_TYPE = ITEM_LISTIN_TAB_TYPE.CATEGORIES;
  public actionMenuClickListener: any;
  public isActionMenuVisible: boolean = false;
  public menu!: Element;

  constructor(
    private router: Router,
    private dataService: DataService,
    private preloaderService: PreLoaderService,
    private toastService: ToastService
  ) { }

  public ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    if(this.activatedTab === ITEM_LISTIN_TAB_TYPE.CATEGORIES) {
      this.fetchCategoryListingData();
    } else {
      this.fetchItemListingData();
    }
  }

  private fetchCategoryListingData(): void {
    this.preloaderService.show();
    this.dataService.get(API_CATEGORY_LISTING)
      .then((response: IAPIResponse<ICategoryListing[]>) => {
        this.preloaderService.hide();
        this.categoryListingData = response.data;
      })
      .catch(e => {
        console.error(e);
        this.preloaderService.hide();
      })
  }

  private fetchItemListingData(): void {
    this.preloaderService.show();
    this.dataService.get(API_FOOD_ITEM_CRUD)
    .then((response: IAPIResponse<IItemListing[]>) => {
        this.preloaderService.hide();
        this.itemListingData = response.data;
      })
      .catch(e => {
        console.error(e);
        this.preloaderService.hide();
      })
  }

  public changeTab(tabType: ITEM_LISTIN_TAB_TYPE): void {
    this.activatedTab = tabType;
    this.fetchData();
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
    this.router.navigate([CREATE_CATEGORY_PAGE], { queryParams: queryParameter })
  }

  public onMenuDeleteClick(guid: string) {
    this.preloaderService.show();
    let API_URL!: string;
    if(this.activatedTab === ITEM_LISTIN_TAB_TYPE.CATEGORIES) {
      API_URL = API_CATEGORY_CRUD;
    } else if(this.activatedTab === ITEM_LISTIN_TAB_TYPE.ITEMS) {
      API_URL = API_FOOD_ITEM_CRUD;
    }

    this.dataService.delete(API_URL + `?guid=${guid}`)
      .then((response: IAPIResponse<ICategoryListing[] | IItemListing[]>) => {
        if (!response.success) {
          throw Error;
        }
        if(this.activatedTab === ITEM_LISTIN_TAB_TYPE.CATEGORIES) {
          this.categoryListingData = response.data;
          this.toastService.enque(CATEGORY_DELETED_SUCCESS_TOAST_DATA);
        } else if(this.activatedTab === ITEM_LISTIN_TAB_TYPE.ITEMS) {
          this.itemListingData = response.data;
          this.toastService.enque(ITEM_DELETED_SUCCESS_TOAST_DATA);
        }

        this.preloaderService.hide()
      })
      .catch(e => {
        this.displayPopup(this.errorPopupHeading, e.error.message);
        this.preloaderService.hide();
      })
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

  public redirectToAdditem(): void {
    this.router.navigateByUrl(CREATE_FOOD_ITEM_PAGE);
  }

  public redirectToCreateCategory(): void {
    this.router.navigateByUrl(CREATE_CATEGORY_PAGE);
  }
}
