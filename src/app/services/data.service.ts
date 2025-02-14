import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REQUEST_TYPE } from '../common/appEnums';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  public getData(url: string, requestType: REQUEST_TYPE, data: any = null): Promise<any> {
    switch(requestType) {
      case REQUEST_TYPE.GET:
        return this.http.get(url).toPromise();
      case REQUEST_TYPE.POST:
        return this.http.post(url, data).toPromise();
    }

  }
}
