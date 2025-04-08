import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { PreLoaderService } from '../../services/pre-loader.service';
import { ToastService } from '../../services/toast.service';
import { IAPIResponse, IAuthSuccessData, IToastEventData } from '../../common/models/interfaces';
import { TOAST_TYPE } from '../../common/appEnums';
import { API_CUSTOMER_LOGIN, API_CUSTOMER_LOGIN_SEND_OTP } from '../../common/apiConstants';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserLoginModel } from '../../common/models/user-login-model';
import { DASHBOARD_PAGE } from '../../common/appConstants';
import { PopupComponent } from '../../common/components/popup/popup.component';

const OTP_EXPIRITION_TIME = 10 * 60;
const OTP_SEND_SUCCESSFULLY_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "OTP sent successfully! Please check your email."
}
const LOGIN_SUCCESS_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "Welcome! You’re successfully signed in."
}

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PopupComponent
  ],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.scss'
})
export class CustomerLoginComponent {
  public remainingTime = OTP_EXPIRITION_TIME;
  public userLoginModel: UserLoginModel = new UserLoginModel();
  public isOTPRequested: boolean = false;
  public timer: any = null;
  public errorPopupHeading: string = "Error!";
  public errorPopupText: string = "";
  public showPopup: EventEmitter<boolean> = new EventEmitter<boolean>;

  constructor(
    private router: Router,
    private dataService: DataService,
    private preloaderService: PreLoaderService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  public get isResendOTPBtnVisible(): boolean {
    return this.remainingTime < 480;
  }

  public displayPopup(heading: string, message: string) {
    this.errorPopupHeading = heading;
    this.errorPopupText = message;
    this.showPopup.emit(true);
  }

  public requestOTP(): void {
    this.preloaderService.show();
    this.dataService.post(API_CUSTOMER_LOGIN_SEND_OTP, this.userLoginModel.email)
      .then((response: IAPIResponse<boolean>) => {
        if(!response.success) {
          throw Error;
        }
        this.startTimer();
        this.isOTPRequested = true;
        this.toastService.enque(OTP_SEND_SUCCESSFULLY_TOAST_DATA);
        this.preloaderService.hide();
      })
      .catch((e) => {
        console.error(e);
        this.preloaderService.hide();
      });
  }

  public onCustomerLoginFormSubmit() {
      this.preloaderService.show();
      this.dataService.post(API_CUSTOMER_LOGIN, this.userLoginModel)
      .then((response: IAPIResponse<IAuthSuccessData>) => {
        this.authService.authenticateUser(response.data.token);
        this.toastService.enque(LOGIN_SUCCESS_TOAST_DATA);
        this.router.navigateByUrl(DASHBOARD_PAGE);
        this.preloaderService.hide();
      })
      .catch((e) => {
        console.error(e.error.message);
        this.preloaderService.hide();
        this.displayPopup(this.errorPopupHeading, e.error.message);
      }) 
    }

  private startTimer(): void {
    if(this.timer !== null) {
      clearInterval(this.timer)
    }

    this.remainingTime = OTP_EXPIRITION_TIME;

    this.timer = setInterval(() => {
      this.remainingTime -= 1;
      if(this.remainingTime === 0) {
        this.isOTPRequested = false;
        clearInterval(this.timer);
      }
    }, 1000);
  }
}
