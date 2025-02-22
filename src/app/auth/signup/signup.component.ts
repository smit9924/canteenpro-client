import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserRegistrationModel } from '../../common/models/user-registration-model';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { REQUEST_TYPE } from '../../common/appEnums';
import { SIGNUP_API } from '../../common/apiConstants';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DASHBOARD_PAGE } from '../../common/appConstants';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
    private router: Router
  ) {
  }

  public ngOnInit() {
  }
  
  public togglePasswordFieldType() {
    if(this.passwordFieldRef.nativeElement.type === "password") {
      this.passwordFieldRef.nativeElement.type = "text"
    } else {
      this.passwordFieldRef.nativeElement.type = "password"
    }
  }

  public onSignupFormSubmit() {
    this.dataService.post(SIGNUP_API, REQUEST_TYPE.POST, this.userRegistrationModel)
    .then((response) => {
      this.authService.authenticateUser(response.token);
    })
    .then(() => {
      this.router.navigateByUrl(DASHBOARD_PAGE);
    })
    .catch(e => {
      console.log(e);
    });
  }
}
