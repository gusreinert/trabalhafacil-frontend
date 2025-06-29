import { Component, OnInit } from '@angular/core';
import { StorageService } from '~root/src/shared/services/storage/storage.service';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: false,
})
export class AppComponent implements OnInit {

  constructor(
    private storage: StorageService) { }

  async ngOnInit() {
    await this.storage.init();
  }
}
