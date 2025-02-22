import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserLoginModel } from '../../common/models/user-login-model';
import { LOGIN_API } from '../../common/apiConstants';
import { REQUEST_TYPE } from '../../common/appEnums';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DASHBOARD_PAGE } from '../../common/appConstants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [DataService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('passwordFieldRef', {static:false}) passwordFieldRef!: ElementRef;
  public userLoginModel = new UserLoginModel();

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  public togglePasswordFieldType() {
    if(this.passwordFieldRef.nativeElement.type === "password") {
      this.passwordFieldRef.nativeElement.type = "text"
    } else {
      this.passwordFieldRef.nativeElement.type = "password"
    }
  }

  public onLoginFormSubmit() {
      this.dataService.post(LOGIN_API, REQUEST_TYPE.POST, this.userLoginModel)
      .then((response) => {
        this.authService.authenticateUser(response.token);
      }).then(() => {
        this.router.navigateByUrl(DASHBOARD_PAGE);
      })
      .catch(e => {
        console.log(e);
      });
    }

}
