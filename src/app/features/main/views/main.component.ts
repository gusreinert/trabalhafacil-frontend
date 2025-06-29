import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { OfferFormComponent } from '~features/offers/form/offer-form.component';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: false,
})
export class MainComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private modalController: ModalController) { }

  public ngOnInit() {
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  async openModalOffer() {
    const modal = await this.modalController.create({
      component: OfferFormComponent,
    });
    modal.present();

    const { role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.router.navigate(['/app/offers'])
    }
  }
}
