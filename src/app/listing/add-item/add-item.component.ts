import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimaryButtonComponent } from '../../common/components/button/primary-button/primary-button.component';
import { PopupComponent } from '../../common/components/popup/popup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { CreateItemModel } from '../../common/models/create-item-model';
import { isNullOrEmpty, isNullOrUndefined } from '../../common/utils';
import { CATEGORY_AND_ITEM_LISTING_PAGE, FILE_UPLOAD_URL, IMAGE_FILE_DIRECTORTY, QUERY_PARAM_KEY_GUID } from '../../common/appConstants';
import { PreLoaderService } from '../../services/pre-loader.service';
import { IAPIResponse, ICategoryListing, ICreateItemModel, IToastEventData } from '../../common/models/interfaces';
import { FOOD_ITEM_QUANTITY_UNIT, FOOD_ITEM_TASTE, FOOD_ITEM_TYPE, TOAST_TYPE } from '../../common/appEnums';
import { API_FOOD_ITEM_CRUD } from '../../common/apiConstants';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { FoodItemsListingComponent } from '../food-items/food-items-listing.component';

const DEFAULT_IMAGE_URL = '/assets/images/upload-image-incognito.jpg';
const ACCEPTED_IMAGE_TYPE = ['.jpg', '.jpeg', '.png'];
const SUCCESS_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "New food item created successfully!"
}

const UPDATE_SUCCESSFULLY_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "Food item updated successfully!"
}


@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PrimaryButtonComponent,
    PopupComponent,
    OverlayModule,
    FoodItemsListingComponent
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent implements OnInit {
  @ViewChild('itemImage') itemImage!: ElementRef;
  public ACCEPTED_IMAGE_TYPE = ACCEPTED_IMAGE_TYPE;
  public FOOD_ITEM_QUANTITY_UNIT = FOOD_ITEM_QUANTITY_UNIT;
  public FOOD_ITEM_TASTE = FOOD_ITEM_TASTE;
  public FOOD_ITEM_TYPE = FOOD_ITEM_TYPE;
  public showPopup: EventEmitter<boolean> = new EventEmitter<boolean>;
  public errorPopupHeading: string = "Error!";
  public errorPopupText: string = "";
  public createItemModel: CreateItemModel = new CreateItemModel();
  public isOpen: boolean = false;
  public positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private toastService: ToastService,
    private preloaderService: PreLoaderService
  ) { }

  public ngOnInit(): void {
    // set default image
    this.createItemModel.imageURL = DEFAULT_IMAGE_URL;

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
    if (this.isEditMode) {
      return 'Edit Item';
    } else {
      return 'Create New Item';
    }
  }
  public removeImage(): void {
    this.createItemModel.imageData.guid = "";
    this.createItemModel.imageData.extension = "";
    this.createItemModel.imageData.fileName = "";
    this.createItemModel.imageURL = DEFAULT_IMAGE_URL;
  }

  public get uploadedImageFileName(): string {
    if (isNullOrEmpty(this.createItemModel.imageData.fileName)
      || isNullOrEmpty(this.createItemModel.imageData.extension)) {
      return 'File name not available';
    }

    return this.createItemModel.imageData.fileName
      + '.'
      + this.createItemModel.imageData.extension;
  }

  public onImageSelect(event: any): void {
    const imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.createItemModel.imageURL = reader.result as string;
    };
    reader.readAsDataURL(imageFile);

    this.createItemModel.imageData.fileName = imageFile.name.replace(/\.[^/.]+$/, "");
    this.createItemModel.imageData.extension = imageFile.name.match(/\.([^/.]+)$/)[1];
  }

  public onImageUploadBtnClick(): void {
    this.itemImage.nativeElement.click();
  }

  public isImageUploaded(): boolean {
    return (this.isEditMode && (!isNullOrEmpty(this.createItemModel.imageData.guid)))
      || this.createItemModel.imageURL !== DEFAULT_IMAGE_URL;
  }

  public displayPopup(heading: string, message: string): void {
    this.errorPopupHeading = heading;
    this.errorPopupText = message;
    this.showPopup.emit(true);
  }

  public onCreateBtnClick(): void {
    this.preloaderService.show()
    if (this.isEditMode) {
      // Update category
      this.dataService.put(API_FOOD_ITEM_CRUD, this.createItemModel)
        .then((response: IAPIResponse<any>) => {
          if (!response.success) {
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
      this.dataService.post(API_FOOD_ITEM_CRUD, this.createItemModel)
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

  private fetchCategoryData(): void {
    this.preloaderService.show();
    this.dataService.get(API_FOOD_ITEM_CRUD + `?${QUERY_PARAM_KEY_GUID}=${this.guid}`)
      .then((response: IAPIResponse<ICreateItemModel>) => {
        if (!response.success) {
          throw Error;
        }
        response.data['isEditMode'] = true;
        this.createItemModel.import(response.data)
        this.createItemModel.setImageURL();
        this.preloaderService.hide();
      })
      .catch(e => {
        console.error(e);
        this.preloaderService.hide();
      });
  }

  public detachSelectCategoryOverlay(event: any): void {
    this.isOpen = false;
    this.createItemModel.categories = event;
  }

  public removeCategory(guid: string) {
    this.createItemModel.categories = this.createItemModel.categories.filter( category => category.guid !== guid);
  }

  public backBtnClick(): void {
    this.router.navigateByUrl(CATEGORY_AND_ITEM_LISTING_PAGE);
  }
}
