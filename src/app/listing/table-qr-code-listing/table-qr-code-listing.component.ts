import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PrimaryButtonComponent } from '../../common/components/button/primary-button/primary-button.component';
import { Router } from '@angular/router';
import { CREATE_TABLE_QR_PAGE, QUERY_PARAM_KEY_GUID } from '../../common/appConstants';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { PreLoaderService } from '../../services/pre-loader.service';
import { ICreateTableQRCode, IQRCodeListing, IToastEventData } from '../../common/models/interfaces';
import { API_QR_CODE_CRUD, API_QR_CODE_LISTING } from '../../common/apiConstants';
import { isNullOrUndefined } from '../../common/utils';
import { TOAST_TYPE } from '../../common/appEnums';

const CLASS_HIDDEN = 'hidden';
const DELETED_SUCCESS_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "QR code deleted successfully!"
}

@Component({
  selector: 'app-table-qr-code-listing',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent
  ],
  templateUrl: './table-qr-code-listing.component.html',
  styleUrl: './table-qr-code-listing.component.scss'
})
export class TableQrCodeListingComponent implements OnInit {
  @ViewChild('parentElement') parentElement!: ElementRef;
  public qrCodeListingData: IQRCodeListing[] = [];
  public actionMenuClickListener: any;
  public isActionMenuVisible: boolean = false;
  public menu!: Element;

  constructor(
    private router: Router,
    private dataService: DataService,
    private toastService: ToastService,
    private preloaderService: PreLoaderService
  ) { }

  public ngOnInit(): void {
    this.fetchEditQRCodeData();
  }

  public redirectToCreateQRCodePage(): void {
    this.router.navigateByUrl(CREATE_TABLE_QR_PAGE);
  }

  public menuEditButtonClick(guid: string): void {
    this.router.navigateByUrl(CREATE_TABLE_QR_PAGE + `?${QUERY_PARAM_KEY_GUID}=${guid}`);
  }

  public deleteQRCode(guid: string): void {
    this.preloaderService.show();
    this.dataService.delete(API_QR_CODE_CRUD + `?${QUERY_PARAM_KEY_GUID}=${guid}`)
      .then((response) => {
        if (!response.success) {
          throw Error;
        }
        this.qrCodeListingData = response.data;
        this.toastService.enque(DELETED_SUCCESS_TOAST_DATA);
        this.preloaderService.hide();
      })
      .catch(e => {
        this.preloaderService.hide();
      });
  }

  public menuBtnClick(event: MouseEvent, guid: string) {
    // If action menu is already open and user try to open another menu then close previous menu
    if (!isNullOrUndefined(this.actionMenuClickListener) && !isNullOrUndefined(this.menu)) {
      this.menu?.classList.add(CLASS_HIDDEN)
      document.removeEventListener("click", this.actionMenuClickListener);
    }

    this.isActionMenuVisible = true;
    let menuElement = (this.parentElement?.nativeElement as HTMLElement)?.querySelector('#menu-' + guid);

    if (menuElement !== null) {
      this.menu = menuElement;
      this.menu.classList.remove(CLASS_HIDDEN);

      // Add timeout to prevent immidiate execution of event handler due to event propogation
      setTimeout(() => {
        if (this.menu !== null) {
          this.actionMenuClickListener = (event: MouseEvent) => this.profileDropdownClickListenerHandler(event, this.menu);
          document.addEventListener("click", this.actionMenuClickListener)
        }
      })
    }
  }

  public profileDropdownClickListenerHandler(event: MouseEvent, menu: Element): any {
    const rect = menu.getBoundingClientRect();

    if (!(event.clientX > rect.left && event.clientX < rect.right &&
      event.clientY > rect.top && event.clientY < rect.bottom)) {
      if (this.isActionMenuVisible) {
        this.isActionMenuVisible = false;
        menu.classList.add(CLASS_HIDDEN);

        // Destroying event listener if user click outside the menu 
        if (!isNullOrUndefined(this.actionMenuClickListener)) {
          document.removeEventListener("click", this.actionMenuClickListener);
        }
      }
    }
  }

  private fetchEditQRCodeData(): void {
    this.preloaderService.show();
    this.dataService.get(API_QR_CODE_LISTING)
      .then((response) => {
        if (!response.success) {
          throw Error;
        }
        this.qrCodeListingData = response.data;
        this.preloaderService.hide();
      })
      .catch(e => {
        console.log(e);
        this.preloaderService.hide();
      });
  }


}
