import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeaturelistService } from '../featurelist/featurelist.service';
import { saveAs } from 'file-saver';
import { provideCloudinaryLoader } from '@angular/common';


@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {
  data: any = "";
  errorMsg: { msg: string; status: string } | null = null;
  showTableFlag: any = false;
  docName: any = "";
  showSearchFlag: boolean = false;

  constructor(private router: Router,
    private _service: FeaturelistService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
    const payload = {
      "id":"",
      "documentName": ""
    }
    this._service.getAllData(payload).subscribe(res => {
      this.data = res.response;
      this.showTableFlag = res.result;
    });
  }

  downloadFileById(value: any) {
    console.log(value)
    this._service.downloadFile(value.id).subscribe((res: Blob) => {
      let originalFileName = value.fileName;
      const extentionOfFile = originalFileName.slice(originalFileName.lastIndexOf("."), originalFileName.length);
      const fileNameWithoutEx = originalFileName.slice(0, originalFileName.includes(" ") ? originalFileName.indexOf(" ") : originalFileName.lastIndexOf("."));
      const downloadfileName = `${fileNameWithoutEx}_downloded` + extentionOfFile;
      saveAs(res, downloadfileName);
    }, error => {
      console.error('Download failed:', error);
    });
  }

  deletedDocument(id: number) {
    this._service.deleteFile(id).subscribe((res: any) => {
      console.log(res.msg)
      this.errorMsg = { msg: res.message, status: "success" }
    })
    this.getAllData();
  }

  uploadFile(event: any) {
    const file = event.files?.[0];
    this._service.uploadFile(file).subscribe(
      res => {
        this.errorMsg = { msg: res.message, status: "success" }
      }
    )
    this.getAllData();
  }
  
  filterId(id: any,fieldType:any){
    this.data= []
    let fieldName = fieldType.value;
    console.log(id.value)
    console.log(fieldType.value)

    let payload = {
      [fieldName]:id.value
    }
    this._service.getAllData(payload).subscribe(res => {
      this.data = res.response;

      if(res.response == null){
        this.showTableFlag = res.result;
      }
    });
  }

  resetButton(){
    this.getAllData(); 
  }

  showSearchBar(){
    this.showSearchFlag = !this.showSearchFlag;
  }
  autoSuggestionDD(fileName: any , fieldType:any){
   
    let payload = {
      documentName:fileName
    }
    if(fieldType.value === "documentName" && fileName.length > 3){
      this._service.autoSuggest(payload).subscribe((res:any) => {
        this.docName = res;
      })
    }
    
  }
}
