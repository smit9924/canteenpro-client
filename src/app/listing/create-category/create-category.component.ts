import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { isNullOrEmpty, isNullOrUndefined } from '../../common/utils';
import { CATEGORY_AND_ITEM_LISTING_PAGE, FILE_UPLOAD_URL, IMAGE_FILE_DIRECTORTY, QUERY_PARAM_KEY_GUID } from '../../common/appConstants';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../../common/components/popup/popup.component';
import { CreateCategotyModel } from '../../common/models/create-category-model';
import { PrimaryButtonComponent } from '../../common/components/button/primary-button/primary-button.component';
import { DataService } from '../../services/data.service';
import { API_CATEGORY_CRUD } from '../../common/apiConstants';
import { IAPIResponse, ICreateCategoryModel, IToastEventData } from '../../common/models/interfaces';
import { TOAST_TYPE } from '../../common/appEnums';
import { PreLoaderService } from '../../services/pre-loader.service';

const DEFAULT_IMAGE_URL = '/assets/images/upload-image-incognito.jpg';
const ACCEPTED_IMAGE_TYPE = ['.jpg', '.jpeg', '.png'];
const SUCCESS_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "Category created successfully!"
}

const UPDATE_SUCCESSFULLY_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "Category updated successfully!"
}

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PopupComponent,
    PrimaryButtonComponent
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent implements OnInit {
  @ViewChild('categoryImage') categoryImage!: ElementRef;
  public ACCEPTED_IMAGE_TYPE = ACCEPTED_IMAGE_TYPE;
  public showPopup: EventEmitter<boolean> = new EventEmitter<boolean>;
  public errorPopupHeading: string = "Error!";
  public errorPopupText: string = "";
  public createCategoryModel: CreateCategotyModel = new CreateCategotyModel();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private dataService: DataService,
    private preloaderService: PreLoaderService
  ) { }

  public ngOnInit(): void {
    // set default image
    this.createCategoryModel.imageURL = DEFAULT_IMAGE_URL;

    // Fetching user data if in edit mode
    if (this.isEditMode) {
      this.fetchCategoryData();
    }
  }

  public get isEditMode(): boolean {
    let guid: string | null = this.route.snapshot.queryParamMap.get(QUERY_PARAM_KEY_GUID);
    return isNullOrUndefined(guid) ? false : true;
  }

  public get guid(): string | null {
    let guid: string | null = this.route.snapshot.queryParamMap.get(QUERY_PARAM_KEY_GUID);
    return guid;
  }

  public getPageTitle(): string {
    if (!this.isEditMode) {
      return 'Create New Category';
    } else {
      return 'Edit Category';
    }
  }

  public displayPopup(heading: string, message: string): void {
    this.errorPopupHeading = heading;
    this.errorPopupText = message;
    this.showPopup.emit(true);
  }

  public removeImage(): void {
    this.createCategoryModel.imageData.guid = "";
    this.createCategoryModel.imageData.extension = "";
    this.createCategoryModel.imageData.fileName = "";
    this.createCategoryModel.imageURL = DEFAULT_IMAGE_URL;
  }

  public get uploadedImageFileName(): string {
    if (isNullOrEmpty(this.createCategoryModel.imageData.fileName)
      || isNullOrEmpty(this.createCategoryModel.imageData.extension)) {
      return 'File name not available';
    }

    return this.createCategoryModel.imageData.fileName
      + '.'
      + this.createCategoryModel.imageData.extension;
  }

  public onImageSelect(event: any): void {
    const imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.createCategoryModel.imageURL = reader.result as string;
    };
    reader.readAsDataURL(imageFile);

    this.createCategoryModel.imageData.fileName = imageFile.name.replace(/\.[^/.]+$/, "");
    this.createCategoryModel.imageData.extension = imageFile.name.match(/\.([^/.]+)$/)[1];
  }

  public onImageUploadBtnClick(): void {
    this.categoryImage.nativeElement.click();
  }

  public isImageUploaded(): boolean {
    return (this.isEditMode && (!isNullOrEmpty(this.createCategoryModel.imageData.guid)))
      || this.createCategoryModel.imageURL !== DEFAULT_IMAGE_URL;
  }

  public onCreateBtnClick(): void {
    this.preloaderService.show()
    if (this.isEditMode) {
      // Update category
      this.dataService.put(API_CATEGORY_CRUD,  this.createCategoryModel)
        .then((response: IAPIResponse<any>) => {
          if(!response.success) {
            throw Error;
          }
          this.toastService.enque(UPDATE_SUCCESSFULLY_TOAST_DATA);
          this.router.navigateByUrl(CATEGORY_AND_ITEM_LISTING_PAGE);
        })
        .catch(e => {
          console.error(e);
        });
    } else {
      // Create new category
      this.dataService.post(API_CATEGORY_CRUD, this.createCategoryModel)
        .then((response: IAPIResponse<any>) => {
          if (!response.success) {
            throw Error;
          }
          this.toastService.enque(SUCCESS_TOAST_DATA);
          this.router.navigateByUrl(CATEGORY_AND_ITEM_LISTING_PAGE);
          this.preloaderService.hide();
        })
        .catch(e => {
          this.preloaderService.hide();
          this.displayPopup(this.errorPopupHeading, e.error.message);
        })
    }
  }

  public backBtnClick(): void {
    this.router.navigateByUrl(CATEGORY_AND_ITEM_LISTING_PAGE);
  }

  private fetchCategoryData(): void {
    this.preloaderService.show();
    this.dataService.get(API_CATEGORY_CRUD+ `?${QUERY_PARAM_KEY_GUID}=${this.guid}`)
      .then((response: IAPIResponse<ICreateCategoryModel>) => {
        if(!response.success) {
          throw Error;
        }
        this.createCategoryModel.isEditMode = true;
        this.createCategoryModel.import(response.data)
        this.createCategoryModel.imageURL = FILE_UPLOAD_URL + IMAGE_FILE_DIRECTORTY + this.createCategoryModel.imageData.guid + '.' + this.createCategoryModel.imageData.extension;
        this.preloaderService.hide();
      })
      .catch(e => {
        console.error(e);
        this.preloaderService.hide();
      });
  }

}
