import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaskitoDirective, MaskitoPipe } from '@maskito/angular';
import { OfferDetailComponent } from './detail/offer-detail.component';
import { OfferFormComponent } from './form/offer-form.component';
import { OffersComponent } from './list/offers.component';
import { OffersFeatureRouting } from './offers-feature.routing';
import { OfferRatingComponent } from './rating/offer-rating.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MaskitoPipe,
    MaskitoDirective,
    OffersFeatureRouting
  ],
  declarations: [
    OffersComponent,
    OfferFormComponent,
    OfferDetailComponent,
    OfferRatingComponent,
  ]
})
export class OffersFeatureModule { }
