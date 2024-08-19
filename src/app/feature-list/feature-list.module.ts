import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureListRoutingModule } from './feature-list-routing.module';
import { FeatureListComponent } from './feature-list.component';
import { SharedModule } from '../shared/shared.module';
import { FeaturelistService } from '../featurelist/featurelist.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [FeatureListComponent],
  imports: [
    CommonModule,
    FeatureListRoutingModule,
    SharedModule,
    HttpClientModule 
  ],
  providers:[FeaturelistService]
})
export class FeatureListModule { 
  constructor() {
    console.log('FeatureModule loaded');
  }
}
