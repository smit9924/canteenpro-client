import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DASHBOARD_PAGE, INPUT_FIELD_TYPE_PASSWORD, INPUT_FIELD_TYPE_TEXT } from '../../common/appConstants';
import { DataService } from '../../services/data.service';
import { PreLoaderService } from '../../services/pre-loader.service';
import { ChangePasswordModel } from '../../common/models/change-password-model';
import { FormsModule } from '@angular/forms';
import { API_CHANGE_DEFAULT_PASSWORD } from '../../common/apiConstants';
import { IAPIResponse, IUserProfile } from '../../common/models/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-default-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './change-default-password.component.html',
  styleUrl: './change-default-password.component.scss'
})
export class ChangeDefaultPasswordComponent {
  public INPUT_FIELD_TYPE_PASSWORD = INPUT_FIELD_TYPE_PASSWORD;
  public INPUT_FIELD_TYPE_TEXT = INPUT_FIELD_TYPE_TEXT;
  public inputFieldType: string = INPUT_FIELD_TYPE_PASSWORD;
  public changePasswordModel = new ChangePasswordModel();

  constructor(
    private router: Router,
    private dataService: DataService,
    private preloaderService: PreLoaderService
  ) {}

  public togglePassword(): void {
    if(this.inputFieldType === INPUT_FIELD_TYPE_PASSWORD) {
      this.inputFieldType = INPUT_FIELD_TYPE_TEXT;
    } else {
      this.inputFieldType = INPUT_FIELD_TYPE_PASSWORD;
    }
  }

  public onChangePasswordBtnClick() {
    this.preloaderService.show();
    this.dataService.post(API_CHANGE_DEFAULT_PASSWORD, this.changePasswordModel.password)
      .then((response: IAPIResponse<IUserProfile>) => {
        this.dataService.setUserProfileData(response.data);
        this.router.navigateByUrl(DASHBOARD_PAGE);
        this.preloaderService.hide();
      })
      .catch((e) => {
        // TODO: Show error popup here
        this.preloaderService.hide();
        console.log(e.error.message);
      });
  }
}
