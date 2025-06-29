import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainComponent } from './views/main.component';
import { MainFeatureRouting } from './main-feature.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainFeatureRouting
  ],
  declarations: [
    MainComponent
  ]
})
export class MainFeatureModule { }
