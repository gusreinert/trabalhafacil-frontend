import { Injectable, NgModule } from '@angular/core';
import { CanActivate, Router, RouterModule, Routes } from '@angular/router';
import { from, map } from 'rxjs';
import { StorageService } from '~root/src/shared/services/storage/storage.service';
import { MainComponent } from './views/main.component';

@Injectable()
export class MainFeatureRoutingGuard implements CanActivate {

  constructor(
    private router: Router,
    private storage: StorageService) { }

  canActivate() {
    return from(this.storage.get('auth-token'))
      .pipe(
        map((token) => {
          if (!token)
            this.router.navigate(['/login']);

          return !!token;
        }));
  }
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'offers',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [MainFeatureRoutingGuard],
    children: [
      {
        path: 'offers',
        loadChildren: () => import('src/app/features/offers/offers-feature.module').then(m => m.OffersFeatureModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('src/app/features/chat/chat-feature.module').then(m => m.ChatFeatureModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('src/app/features/notifications/notifications-feature.module').then(m => m.NotificationsFeatureModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('src/app/features/profile/profile-feature.module').then(m => m.ProfileFeatureModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    MainFeatureRoutingGuard
  ]
})
export class MainFeatureRouting { }
