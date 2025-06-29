import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { OfferCandidateDTO, OfferDTO } from '~core/entities/offer/offer-dto';
import { OfferService } from '~core/entities/offer/offer.service';
import { RoleEnum } from '~core/enums/role-enum';
import { AuthService } from '~shared/services/auth/auth.service';

@Component({
  selector: 'offer-detail-component',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss'],
  standalone: false,
})
export class OfferDetailComponent implements OnInit, OnDestroy {
  @Input() offerId!: string;
  public offer!: OfferDTO;
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
    this.loadOffer();
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public close() {
    return this.modalController.dismiss(null, 'close');
  }

  public doHandleRefresh(event: CustomEvent) {
    setTimeout(() => {
      this.loadOffer();

      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  private loadUserAvatars() {
    this.userAvatars = [
      'assets/avatars/avatar1.svg', 'assets/avatars/avatar2.svg', 'assets/avatars/avatar3.svg',
      'assets/avatars/avatar4.svg', 'assets/avatars/avatar5.svg', 'assets/avatars/avatar6.svg',
      'assets/avatars/avatar7.svg', 'assets/avatars/avatar8.svg', 'assets/avatars/avatar9.svg'];
  }

  private loadUserData() {
    this.authService.userData().subscribe(data => this.userData = data);
  }

  private loadOffer() {
    this.offerService
      .getById(this.offerId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.offer = {
          ...response?.data,
          user: {
            ...response?.data.user,
            avatar: this.getRandomAvatar()
          }
        }
      })
  }

  private getRandomAvatar() {
    const index = Math.floor(Math.random() * this.userAvatars.length);
    return this.userAvatars[index];
  }

  public isUser() {
    return (this.userData?.role == RoleEnum.USER);
  }

  public isWorker() {
    return (this.userData?.role == RoleEnum.WORKER);
  }

  public selectCandidate(id: string) {
    this.offer.candidates.forEach(candidate => { candidate.selected = candidate.id === id; });
  }

  public cannotApplyToOffer() {
    if (!this.offer) return;
    return ((this.userData?.role === 'USER') || (this.offer.candidates?.some((candidate: any) => candidate.user?.id === this.userData.id)));
  }

  public canEndOffer() {
    if (!this.offer) return;
    return ((this.userData?.role === 'USER') && (this.offer.hireDate));
  }

  public disableEndOffer() {
    if (!this.offer) return;
    return (this.offer?.endDate)
  }

  public canHireCandidate() {
    if (!this.offer) return;
    return ((this.userData?.role == RoleEnum.USER) && (!this.canEndOffer()));
  }

  public disableHireCandidate() {
    if (!this.offer) return;
    return !(this.offer.candidates.some(candidate => candidate.selected));
  }

  public doApplyToOffer() {
    this.offerService
      .addCandidate(this.offer.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.loadOffer());
  }

  public doHireCandidate() {
    const updateOffer: OfferDTO = {
      ...this.offer,
      hireDate: new Date().toISOString()
    }

    const selectedCandidate = this.offer.candidates.find(candidate => candidate.selected);
    if (selectedCandidate) {
      const updateCandidate: OfferCandidateDTO = { ...selectedCandidate };

      this.offerService
        .update(updateOffer)
        .pipe(
          takeUntil(this.ngUnsubscribe),
          switchMap(() => this.offerService.updateCandidate(this.offer?.id, updateCandidate))
        )
        .subscribe(() => this.loadOffer());
    }
  }

  public doEndOffer() {
    this.offer = {
      ...this.offer,
      endDate: new Date().toISOString()
    }

    this.offerService
      .update(this.offer)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.modalController.dismiss(null, 'confirm'));
  }
}
