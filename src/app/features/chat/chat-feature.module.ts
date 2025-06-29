import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatFeatureRouting } from './chat-feature.routing';
import { ChatComponent } from './views/chat.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatFeatureRouting
  ],
  declarations: [
    ChatComponent
  ]
})
export class ChatFeatureModule { }
