import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeaturelistService {
  
  constructor(private _http:HttpClient) { }

  private commonUrl = "http://localhost:8091";

  getAllData(data:any):Observable<any>{
    return this._http.post(this.commonUrl + '/myDocuments' + '/searchData', data);
  }

  downloadFile(id: any) {
    return this._http.post(this.commonUrl + '/myDocuments' + `/download/${id}`, '')
  }
}
