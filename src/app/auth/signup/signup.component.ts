import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserRegistrationModel } from '../../common/models/user-registration-model';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { REQUEST_TYPE, TOAST_TYPE } from '../../common/appEnums';
import { SIGNUP_API } from '../../common/apiConstants';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DASHBOARD_PAGE, INPUT_FIELD_TYPE_PASSWORD, INPUT_FIELD_TYPE_TEXT } from '../../common/appConstants';
import { IAPIResponse, IAuthSuccessData, IToastEventData } from '../../common/models/interfaces';
import { PrimaryButtonComponent } from '../../common/components/button/primary-button/primary-button.component';
import { ToastService } from '../../services/toast.service';

const REGISTRATION_SUCCESS_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "Welcome aboard! Registration and login successful!"
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
    PrimaryButtonComponent
  ],
  providers: [DataService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  @ViewChild('passwordFieldRef', {static:false}) passwordFieldRef!: ElementRef;
  public userRegistrationModel: UserRegistrationModel = new UserRegistrationModel();

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  public ngOnInit() {
  }
  
  public togglePasswordFieldType(): void {
    if(this.passwordFieldRef.nativeElement.type === INPUT_FIELD_TYPE_PASSWORD) {
      this.passwordFieldRef.nativeElement.type = INPUT_FIELD_TYPE_TEXT;
    } else {
      this.passwordFieldRef.nativeElement.type = INPUT_FIELD_TYPE_PASSWORD;
    }
  }

  public onSignupFormSubmit(): void {
    this.dataService.post(SIGNUP_API, REQUEST_TYPE.POST, this.userRegistrationModel)
    .then((response: IAPIResponse<IAuthSuccessData>) => {
      this.authService.authenticateUser(response.data.token);
      this.toastService.enque(REGISTRATION_SUCCESS_TOAST_DATA);
      this.router.navigateByUrl(DASHBOARD_PAGE);
    })
    .catch(e => {
      console.log(e.error);
    });
  }
}
