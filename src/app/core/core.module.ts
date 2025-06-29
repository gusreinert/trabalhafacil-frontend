import { NgModule } from "@angular/core";
import { OfferModule } from "~core/entities/offer/offer.module";
import { UserModule } from "~core/entities/user/user.module";
import { NotificationModule } from "~core/entities/notification/notification.module";

@NgModule({
    imports: [
        UserModule,
        OfferModule,
        NotificationModule
    ]
})
export class CoreModule { }