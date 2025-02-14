import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserRegistrationModel } from '../../common/models/user-registration-model';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { REQUEST_TYPE } from '../../common/appEnums';

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
    private dataService: DataService
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
    this.dataService.getData("http://localhost:8080/api/auth/signup", REQUEST_TYPE.POST, this.userRegistrationModel)
    .then((response) => {
      console.log(response)
    });
    console.log(this.userRegistrationModel)
  }
}
