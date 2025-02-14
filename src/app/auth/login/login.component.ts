import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserLoginModel } from '../../common/models/user-login-model';

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
  public userloginModel = new UserLoginModel();

  constructor(
    private dataService: DataService
  ) {
  }

  public togglePasswordFieldType() {
    if(this.passwordFieldRef.nativeElement.type === "password") {
      this.passwordFieldRef.nativeElement.type = "text"
    } else {
      this.passwordFieldRef.nativeElement.type = "password"
    }
  }

}
