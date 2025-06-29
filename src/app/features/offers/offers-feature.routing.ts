import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersComponent } from './list/offers.component';
import { OfferFormComponent } from './form/offer-form.component';

const routes: Routes = [
  {
    path: '',
    component: OffersComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class OffersFeatureRouting { }
