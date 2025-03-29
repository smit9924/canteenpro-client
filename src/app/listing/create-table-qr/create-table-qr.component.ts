import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../../common/components/popup/popup.component';
import { isNullOrUndefined } from '../../common/utils';
import { CREATE_TABLE_QR_LISTING_PAGE as TABLE_QR_LISTING_PAGE, QUERY_PARAM_KEY_GUID } from '../../common/appConstants';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateTableQRCodeModel } from '../../common/models/create-table-qr-code-model';
import { PrimaryButtonComponent } from '../../common/components/button/primary-button/primary-button.component';
import { PreLoaderService } from '../../services/pre-loader.service';
import { DataService } from '../../services/data.service';
import { API_QR_CODE_CRUD } from '../../common/apiConstants';
import { ToastService } from '../../services/toast.service';
import { IToastEventData } from '../../common/models/interfaces';
import { TOAST_TYPE } from '../../common/appEnums';

const SUCCESSFULL_CREATED_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "New QR Code generated successfully!"
}
const SUCCESSFULL_EDITED_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "QR Code updated generated successfully!"
}

@Component({
  selector: 'app-create-table-qr',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PopupComponent,
    PrimaryButtonComponent
  ],
  templateUrl: './create-table-qr.component.html',
  styleUrl: './create-table-qr.component.scss'
})
export class CreateTableQrComponent implements OnInit {
  public tableQRModel: CreateTableQRCodeModel = new CreateTableQRCodeModel();
  public showPopup: EventEmitter<boolean> = new EventEmitter<boolean>;
  public errorPopupHeading: string = "Error!";
  public errorPopupText: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private preloaderService: PreLoaderService,
    private dataService: DataService,
    private toastService: ToastService
  ) { }

  public ngOnInit(): void {
    // Fetching user data if in edit mode
    if (this.isEditMode) {
      this.fetchEditQRCodeData();
    }
  }

  public get isEditMode(): boolean {
    let guid: string | null = this.route.snapshot.queryParamMap.get(QUERY_PARAM_KEY_GUID);
    return isNullOrUndefined(guid) ? false : true;
  }

  public get guid(): string | null {
    let guid: string | null = this.route.snapshot.queryParamMap.get(QUERY_PARAM_KEY_GUID);
    return guid;
  }

  public backBtnClick(): void {
    this.router.navigateByUrl(TABLE_QR_LISTING_PAGE);
  }

  public getPageTitle(): string {
    let titlePrefix: string = "";
    if (this.isEditMode) {
      titlePrefix = "Edit ";
    } else {
      titlePrefix = "Create New ";
    }

    return (titlePrefix + 'QR Code');
  }

  public onCreateBtnClick(): void {
    this.preloaderService.show();
    if(this.isEditMode) {
      this.dataService.put(API_QR_CODE_CRUD, this.tableQRModel)
        .then((response) => {
          this.toastService.enque(SUCCESSFULL_EDITED_TOAST_DATA);
          this.router.navigateByUrl(TABLE_QR_LISTING_PAGE);
          this.preloaderService.hide();
        })
        .catch(e => {
          this.displayPopup(this.errorPopupHeading, e.error.message);
          this.preloaderService.hide();
        });
    } else {
      this.dataService.post(API_QR_CODE_CRUD, this.tableQRModel)
        .then((response) => {
          this.toastService.enque(SUCCESSFULL_CREATED_TOAST_DATA);
          this.router.navigateByUrl(TABLE_QR_LISTING_PAGE);
          this.preloaderService.hide();
        })
        .catch(e => {
          this.displayPopup(this.errorPopupHeading, e.error.message);
          this.preloaderService.hide();
        });
    }
  }

  public displayPopup(heading: string, message: string): void {
    this.errorPopupHeading = heading;
    this.errorPopupText = message;
    this.showPopup.emit(true);
  }

  private fetchEditQRCodeData(): void {
    this.preloaderService.show();
    this.dataService.get(API_QR_CODE_CRUD + `?${QUERY_PARAM_KEY_GUID}=${this.guid}`)
      .then((response) => {
        if(!response.success) {
          throw Error;
        }
        console.log(response);
        this.tableQRModel.import(response.data);
        this.tableQRModel.isEditMode = true;
        this.preloaderService.hide();
      })
      .catch(e => {
        this.displayPopup(this.errorPopupHeading, e.error.message);
        this.preloaderService.hide();
      });
  }

  public toggleSelfServiceQR(event: any) {
    if (event.target.checked) {
      this.tableQRModel.selfServiceQRCode = true;
      this.tableQRModel.capacity = 0;
      this.tableQRModel.number = 0;
    } else {
      this.tableQRModel.selfServiceQRCode = false;
    }
  }

}
