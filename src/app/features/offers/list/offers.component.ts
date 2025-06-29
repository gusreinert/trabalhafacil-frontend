import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { OfferPreviewDTO } from '~core/entities/offer/offer-preview-dto';
import { OfferService } from '~core/entities/offer/offer.service';
import { OfferDetailComponent } from '~root/src/app/features/offers/detail/offer-detail.component';
import { AuthService } from '~shared/services/auth/auth.service';
import { OfferRatingComponent } from '../rating/offer-rating.component';

@Component({
  selector: 'offers-component',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
  standalone: false,
})
export class OffersComponent implements OnInit, OnDestroy {
  public offers!: OfferPreviewDTO[];
  public userData!: any;
  private userAvatars!: any;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private authService: AuthService,
    private offerService: OfferService,
    private modalController: ModalController) { }

  public ngOnInit() {
    this.loadUserAvatars();

    this.loadUserData();
    this.loadOffers();
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public doHandleRefresh(event: CustomEvent) {
    setTimeout(() => {
      this.loadOffers();

      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  public async openModalOfferDetail(offer: OfferPreviewDTO) {
    const modal = await this.modalController.create({
      component: OfferDetailComponent,
      componentProps: {
        offerId: offer.id,
      }
    });
    modal.present();

    const { role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.openModalOfferRating(offer);
    }
  }

  public async openModalOfferRating(offer: OfferPreviewDTO) {
    const modal = await this.modalController.create({
      component: OfferRatingComponent,
      componentProps: {
        offerId: offer.id,
      }
    });
    modal.present();
    this.loadOffers();
  }


  private loadUserData() {
    this.authService.userData().subscribe(data => this.userData = data);
  }

  private loadUserAvatars() {
    this.userAvatars = [
      'assets/avatars/avatar1.svg', 'assets/avatars/avatar2.svg', 'assets/avatars/avatar3.svg',
      'assets/avatars/avatar4.svg', 'assets/avatars/avatar5.svg', 'assets/avatars/avatar6.svg',
      'assets/avatars/avatar7.svg', 'assets/avatars/avatar8.svg', 'assets/avatars/avatar9.svg'];
  }

  private loadOffers() {
    this.offerService
      .getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.offers = response.data?.contents.map((content: any) => {
          return {
            ...content,
            user: {
              ...content.user,
              avatar: this.getRandomAvatar()
            }
          }
        });
      });
  }

  private getRandomAvatar() {
    const index = Math.floor(Math.random() * this.userAvatars.length);
    return this.userAvatars[index];
  }
}
