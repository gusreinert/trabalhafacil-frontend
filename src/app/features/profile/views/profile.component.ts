import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserDTO } from '~core/entities/user/user-dto';
import { UserService } from '~core/entities/user/user.service';
import { AuthService } from '~shared/services/auth/auth.service';

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: false,
})
export class ProfileComponent implements OnInit, OnDestroy {
  public profileForm!: FormGroup;
  private user?: UserDTO;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService) { }

  public ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.nullValidator]],
      email: ['', [Validators.nullValidator]]
    });
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ionViewWillLeave() {
    this.user = undefined;
  }

  ionViewDidEnter() {
    this.loadUser();
  }

  public close() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public doHandleRefresh(event: CustomEvent) {
    setTimeout(() => {
      this.loadUser();

      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  private loadUser() {
    this.userService
      .me()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.user = response?.data;
        this.profileForm.patchValue({ name: this.user?.name, email: this.user?.email });
      });
  }
}
