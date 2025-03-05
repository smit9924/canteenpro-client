import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { UpsertUserModel } from '../../common/models/upsert-user-model';
import { TOAST_TYPE, USER_ROLES } from '../../common/appEnums';
import { ERROR_PAGE, MANAGER_LISTING, QUERY_PARAM_KEY_GUID } from '../../common/appConstants';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CREATE_MANAGER, GET_USER_DATA_FROM_GUID, UPDATE_USER, USER_CRUD_BASE_URL, USER_ROLES_API } from '../../common/apiConstants';
import { IAPIResponse, IRoleList, IToastEventData } from '../../common/models/interfaces';
import { PrimaryButtonComponent } from '../../common/components/button/primary-button/primary-button.component';
import { ToastService } from '../../services/toast.service';
import { PopupComponent } from '../../common/components/popup/popup.component';
import { isNullOrUndefined } from '../../common/utils';

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
  providers: [
    DataService
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit {
  public role: USER_ROLES | null = null;
  public createManagerModel = new UpsertUserModel();
  public showPopup: EventEmitter<boolean> = new EventEmitter<boolean>;
  public errorPopupHeading: string = "Error!";
  public errorPopupText: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastService: ToastService
  ) {
  }

  public async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.role = params.get('role') as USER_ROLES | null;

      // Check whether user role in URL is valid or not
      this.dataService.get(USER_ROLES_API)
        .then((response: IAPIResponse<IRoleList[]>) => {
          const userRoles: USER_ROLES[] = [];
          response.data.map((userRole) => {
            userRoles.push(userRole.role);
          });
          if (this.role === null || userRoles.indexOf(this.role) === -1) {
            this.router.navigateByUrl(ERROR_PAGE);
            this.router.navigateByUrl(MANAGER_LISTING);
          }
        })
        .catch((ex) => {
          console.error(ex);
        });

        // Fetching user data if in edit mode
        if(this.isEditMode) {
          this.fetchEditUserData();
        }
    });

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
    this.dataService.get(GET_USER_DATA_FROM_GUID + `?guid=${this.guid}`)
      .then((response: IAPIResponse<UpsertUserModel>) => {
        const modelData = response.data;
        modelData.isEditMode = this.isEditMode;
        modelData.guid = this.guid ? this.guid : "";
        this.createManagerModel.import(modelData);
        this.createManagerModel = this.createManagerModel
      })
      .catch((e) => {
        console.error(e.error.message);
      });
  }

  public onCreateBtnClick(): void {
    if(this.isEditMode) {
      this.dataService.put(UPDATE_USER, this.createManagerModel)
      .then((response) => {
        this.toastService.enque(SUCCESSFULL_EDIT_TOAST_DATA);
        this.router.navigateByUrl(MANAGER_LISTING);
      })
      .catch(e => {
        this.displayPopup(this.errorPopupHeading, e.error.message);
      });
    } else {
      this.dataService.post(CREATE_MANAGER, this.createManagerModel)
        .then((response) => {
          this.toastService.enque(SUCCESS_TOAST_DATA);
          this.router.navigateByUrl(MANAGER_LISTING);
        })
        .catch(e => {
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
}
