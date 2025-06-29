import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { OfferService } from '~core/entities/offer/offer.service';
import { OfferRatingDTO } from '~root/src/app/core/entities/offer/offer-rating-dto';

@Component({
  selector: 'offer-rating-component',
  templateUrl: './offer-rating.component.html',
  styleUrls: ['./offer-rating.component.scss'],
  standalone: false,
})
export class OfferRatingComponent implements OnInit, OnDestroy {
  @Input() offerId!: string;
  public rating = 0;
  public comment = '';
  public stars = [1, 2, 3, 4, 5];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private offerService: OfferService,
    private modalController: ModalController) { }

  public ngOnInit() {
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public setRating(value: number) {
    this.rating = value;
  }

  public confirm() {
    const offerRating: OfferRatingDTO = {
      rating: this.rating,
      comment: this.comment,
    }

    this.offerService
      .addRating(this.offerId, offerRating)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.modalController.dismiss(null, 'confirm'));
  }

  public close() {
    return this.modalController.dismiss(null, 'close');
  }
}
