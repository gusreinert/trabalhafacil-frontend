import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MaskitoElementPredicate } from '@maskito/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: false,
})
export class ChatComponent implements OnInit, OnDestroy {

  public homeForm!: FormGroup;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router) { }

  public ngOnInit() {
    this.homeForm = this.fb.group({
    });
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
