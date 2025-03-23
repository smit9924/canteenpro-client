import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { UpsertUserModel } from '../../common/models/upsert-user-model';
import { TOAST_TYPE, USER_ROLES } from '../../common/appEnums';
import { CREATE_USER_BASE_ROUTE, ERROR_PAGE, QUERY_PARAM_KEY_GUID, QUERY_PARAM_ROLE, USER_LISTING_BASE_ROUTE } from '../../common/appConstants';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { API_USER_CRUD } from '../../common/apiConstants';
import { IAPIResponse, IRoleList, IToastEventData } from '../../common/models/interfaces';
import { PrimaryButtonComponent } from '../../common/components/button/primary-button/primary-button.component';
import { ToastService } from '../../services/toast.service';
import { PopupComponent } from '../../common/components/popup/popup.component';
import { isNullOrUndefined } from '../../common/utils';
import { PreLoaderService } from '../../services/pre-loader.service';

const SUCCESS_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "User created successfully!"
}

const SUCCESSFULL_EDIT_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "User updated successfully!"
}

const SUCCESS_POPUP_DATA = {
  heading: "Success!",
  message: "A new user has been successfully created, and the initial login credentials have been sent via email."
}

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PrimaryButtonComponent,
    PopupComponent
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit {
  public createUserModel: UpsertUserModel = new UpsertUserModel();;
  public role: string | null = "";
  public showPopup: EventEmitter<boolean> = new EventEmitter<boolean>;
  public errorPopupHeading: string = "Error!";
  public errorPopupText: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastService: ToastService,
    private preloaderService: PreLoaderService
  ) {
  }

  public async ngOnInit() {
    this.role = this.route.snapshot.paramMap.get(QUERY_PARAM_ROLE);
    await this.validateUserRole(this.role);

    // set user role in model
    this.createUserModel.userType = USER_ROLES[this.role?.toUpperCase() as keyof typeof USER_ROLES];

    // Fetching user data if in edit mode
    if(this.isEditMode) {
      this.fetchEditUserData();
    }
  }

  public async validateUserRole(userRole: string | null) {
    const userRoleList = await this.dataService.getUserRoles();
    const isRoleValid = userRoleList?.some(role => role.role === userRole);
    if(userRole === null || !isRoleValid) {
      this.router.navigateByUrl(ERROR_PAGE);
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

  public fetchEditUserData(): void {
    this.preloaderService.show();
    this.dataService.get(API_USER_CRUD + `?guid=${this.guid}`)
      .then((response: IAPIResponse<UpsertUserModel>) => {
        const modelData = response.data;
        modelData.isEditMode = this.isEditMode;
        modelData.guid = this.guid ? this.guid : "";
        this.createUserModel.import(modelData);
        this.createUserModel = this.createUserModel;
        this.preloaderService.hide();
      })
      .catch((e) => {
        console.error(e.error.message);
        this.preloaderService.hide();
      });
  }

  public onCreateBtnClick(): void {
    this.preloaderService.show();
    if(this.isEditMode) {
      this.dataService.put(API_USER_CRUD, this.createUserModel)
      .then((response) => {
        this.toastService.enque(SUCCESSFULL_EDIT_TOAST_DATA);
        this.router.navigateByUrl(USER_LISTING_BASE_ROUTE + this.role);
        this.preloaderService.hide();
      })
      .catch(e => {
        this.displayPopup(this.errorPopupHeading, e.error.message);
        this.preloaderService.hide();
      });
    } else {
      this.dataService.post(API_USER_CRUD, this.createUserModel)
        .then((response: IAPIResponse<any>) => {
          if(!response.success) {
            throw Error;
          }
          this.toastService.enque(SUCCESS_TOAST_DATA);
          this.router.navigateByUrl(USER_LISTING_BASE_ROUTE + this.role);
          this.preloaderService.hide();
        })
        .catch(e => {
          this.preloaderService.hide();
          this.displayPopup(this.errorPopupHeading, e.error.message);
        })
    }
  }

  public displayPopup(heading: string, message: string): void {
    this.errorPopupHeading = heading;
    this.errorPopupText = message;
    this.showPopup.emit(true);
  }

  public getPageTitle(): string {
    let titlePrefix: string = "";
    if(this.isEditMode) {
      titlePrefix = "Edit ";
    } else {
      titlePrefix = "Create New ";
    }

    return (titlePrefix + this.role);
  }

  public backBtnClick(): void {
    this.router.navigateByUrl(USER_LISTING_BASE_ROUTE + this.role);
  }
}
