import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureListRoutingModule } from './feature-list-routing.module';
import { FeatureListComponent } from './feature-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [FeatureListComponent],
  imports: [
    CommonModule,
    FeatureListRoutingModule,
    SharedModule
  ]
})
export class FeatureListModule { 
  constructor() {
    console.log('FeatureModule loaded');
  }
}
