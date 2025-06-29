import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignupFeatureRouting } from './signup-feature.routing';
import { SignupComponent } from './views/signup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SignupFeatureRouting
  ],
  declarations: [
    SignupComponent
  ]
})
export class SignupFeatureModule { }
