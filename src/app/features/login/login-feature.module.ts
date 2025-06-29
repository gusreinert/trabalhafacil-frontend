import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginFeatureRouting } from './login-feature.routing';

import { LoginComponent } from './views/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginFeatureRouting
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginFeatureModule { }
