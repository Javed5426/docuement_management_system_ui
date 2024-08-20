import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeaturelistService } from '../featurelist/featurelist.service';
import { saveAs } from 'file-saver';
 

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {
  data: any = "";
  errorMsg: { msg: any; status: string; }[] | undefined;
  showTableFlag: any = false;

  constructor(private router: Router,
    private _service:FeaturelistService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
    const payload = {
      "id":"",
      "documentName":""
    }
    this._service.getAllData(payload).subscribe( res=>{
      this.data = res.response;
      this.showTableFlag = res.result;
    });
  }

  downloadFileById(value:any){
    console.log(value)
    this._service.downloadFile(value.id).subscribe((res: Blob) => {
      let originalFileName = value.documentName;
      const extentionOfFile = originalFileName.slice(originalFileName.lastIndexOf("."), originalFileName.length);
      const fileNameWithoutEx = originalFileName.slice(0, originalFileName.includes(" ")?originalFileName.indexOf(" "):originalFileName.lastIndexOf("."));
      const downloadfileName = `${fileNameWithoutEx}_downloded`+extentionOfFile;
      saveAs(res, downloadfileName);
    }, error => {
      console.error('Download failed:', error);
    });
  }

  deletedDocument(id:number){
    this._service.deleteFile(id).subscribe((res:any)=>{
      this.errorMsg = [{msg:res.message, status:"success"}]
    })
  }

}
