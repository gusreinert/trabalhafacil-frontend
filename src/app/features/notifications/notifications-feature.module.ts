import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificationsFeatureRouting } from './notifications-feature.routing';
import { NotificationsComponent } from './views/notifications.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsFeatureRouting
  ],
  declarations: [
    NotificationsComponent
  ]
})
export class NotificationsFeatureModule { }
