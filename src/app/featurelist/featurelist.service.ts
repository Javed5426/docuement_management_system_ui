import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const url = this.commonUrl + '/myDocuments' + `/download/${id}`;
      const headers = new HttpHeaders({
        'Accept': 'application/octet-stream'
      });
      return this._http.post(url, null, {
        responseType: 'blob',
        headers: headers
    });
  }

  deleteFile(id: number) {
    return this._http.delete(this.commonUrl + '/myDocuments' + `/deleteById?id=${id}`)
  }
  
}
