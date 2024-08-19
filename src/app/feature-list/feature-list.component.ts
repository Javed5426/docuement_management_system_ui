import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FeaturelistService } from '../featurelist/featurelist.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {
  data: any = "";

  constructor(private router: Router,
    private _service:FeaturelistService
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
    });
  }

}
