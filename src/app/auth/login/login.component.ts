import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserLoginModel } from '../../common/models/user-login-model';
import { LOGIN_API } from '../../common/apiConstants';
import { REQUEST_TYPE, TOAST_TYPE } from '../../common/appEnums';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DASHBOARD_PAGE, INPUT_FIELD_TYPE_PASSWORD, INPUT_FIELD_TYPE_TEXT } from '../../common/appConstants';
import { PopupComponent } from '../../common/components/popup/popup.component';
import { PrimaryButtonComponent } from '../../common/components/button/primary-button/primary-button.component';
import { ToastComponent } from '../../common/components/toast/toast.component';
import { IAuthSuccessData, IAPIResponse, IToastEventData } from '../../common/models/interfaces';
import { ToastService } from '../../services/toast.service';

const LOGIN_SUCCESS_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "Welcome! You’re successfully signed in."
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
    PopupComponent,
    PrimaryButtonComponent,
    ToastComponent],
  providers: [
    DataService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('passwordFieldRef', {static:false}) passwordFieldRef!: ElementRef;
  public TOAST_TYPE = TOAST_TYPE;
  public userLoginModel: UserLoginModel = new UserLoginModel();
  public errorPopupHeading: string = "Error!";
  public errorPopupText: string = "";
  public showPopup: EventEmitter<boolean> = new EventEmitter<boolean>;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  public togglePasswordFieldType() {
    if(this.passwordFieldRef.nativeElement.type === INPUT_FIELD_TYPE_PASSWORD) {
      this.passwordFieldRef.nativeElement.type = INPUT_FIELD_TYPE_TEXT;
    } else {
      this.passwordFieldRef.nativeElement.type = INPUT_FIELD_TYPE_PASSWORD;
    }
  }
  public displayPopup(heading: string, message: string) {
    this.errorPopupHeading = heading;
    this.errorPopupText = message;
    this.showPopup.emit(true);
  }

  public onLoginFormSubmit() {
    this.dataService.post(LOGIN_API, this.userLoginModel)
    .then((response: IAPIResponse<IAuthSuccessData>) => {
      this.authService.authenticateUser(response.data.token);
      this.toastService.enque(LOGIN_SUCCESS_TOAST_DATA);
      this.router.navigateByUrl(DASHBOARD_PAGE)
    })
    .catch((e) => {
      console.error(e.error.message);
      this.displayPopup(this.errorPopupHeading, e.error.message);
    }) 
  }

}
