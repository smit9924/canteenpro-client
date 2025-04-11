import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactUsFormModel } from '../common/models/contact-us-form-model';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';
import { PreLoaderService } from '../services/pre-loader.service';
import { API_CONTACT_US_GET_SUBJECTS } from '../common/apiConstants';
import { IAPIResponse, IContactUsSubject } from '../common/models/interfaces';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit {
  public contactUsFormModel: ContactUsFormModel = new ContactUsFormModel();
  public subjects: IContactUsSubject[] = [];

  constructor(
    private dataService: DataService,
    private toastService: ToastService,
    private preloaderService: PreLoaderService
  ) {}

  public ngOnInit(): void {
    this.fetchSubjects();  
  }

  private fetchSubjects(): void {
    this.preloaderService.show();
    this.dataService.get(API_CONTACT_US_GET_SUBJECTS)
      .then((response: IAPIResponse<IContactUsSubject[]>) => {
        this.subjects = response.data;
        console.log(this.subjects)
        this.preloaderService.hide();
      })
      .catch((e) => {
        console.error(e);
        this.preloaderService.hide();
      });
  }
}
