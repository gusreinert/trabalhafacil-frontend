import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';
import { Subject, takeUntil } from 'rxjs';
import { OfferDTO } from '~core/entities/offer/offer-dto';
import { environment } from '~environments/environment';
import { HttpService } from '~shared/services/http.service';
import { postalCodeMask } from '~shared/utils/mask-utils';

@Component({
  selector: 'offer-form-component',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
  standalone: false,
  animations: [
    trigger('fadeInOut', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateX(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ])
  ]
})
export class OfferFormComponent implements OnInit, OnDestroy {

  public offerForm!: FormGroup;
  public addressForm!: FormGroup;
  public occupations!: { key: any, value: any }[];
  public selectedSegment: string;
  private ngUnsubscribe = new Subject<void>();

  readonly postalCodeMask: MaskitoOptions = { mask: postalCodeMask };
  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

  constructor(private fb: FormBuilder, private modalController: ModalController, private http: HttpService) {
    this.selectedSegment = "offer";
  }

  public ngOnInit() {
    this.offerForm = this.fb.group({
      title: ['', Validators.required],
      occupation: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.addressForm = this.fb.group({
      postalCode: ['', Validators.required],
      street: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });

    this.loadOccupations();
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private loadOccupations() {
    this.http
      .doGet(`${environment.apiUrl}/occupation`)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => { this.occupations = Object.entries(response.data?.contents).map(([key, value]) => ({ key, value })); });
  }

  public cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  public goToAddress() {
    this.selectedSegment = 'address';
  }

  public confirm() {
    const body: OfferDTO = {
      ...this.offerForm.value,
      ...this.addressForm.value
    }

    this.http
      .doPost(`${environment.apiUrl}/offer`, body)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => { return this.modalController.dismiss(null, 'confirm') });
  }

  public canGoToAddress() {
    return (this.selectedSegment == 'offer');
  }

  public disableGoToAddress() {
    return (this.offerForm.invalid);
  }

  public canConfirm() {
    return ((this.selectedSegment == 'address') && (this.offerForm.valid));
  }

  public disableConfirm() {
    return (this.addressForm.invalid);
  }
}
