import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '~root/src/shared/services/auth/auth.service';
import { RegisterInput } from '~root/src/app/core/interfaces/register-input';
import { RoleEnum } from '~root/src/app/core/enums/role-enum';

@Component({
  selector: 'signup-component',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: false,
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  public ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      worker: [false, null],
    });
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public async onSignup() {
    const body: RegisterInput = {
      ...this.signupForm.value,
      role: this.signupForm.value.worker ? RoleEnum.WORKER : RoleEnum.USER,
    };

    this.authService
      .register(body)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.router.navigate(['/app']));
  }
}