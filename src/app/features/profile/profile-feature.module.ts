import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileFeatureRouting } from './profile-feature.routing';
import { ProfileComponent } from './views/profile.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfileFeatureRouting
  ],
  declarations: [
    ProfileComponent
  ]
})
export class ProfileFeatureModule { }
