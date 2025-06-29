import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login-feature.module').then(m => m.LoginFeatureModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup-feature.module').then(m => m.SignupFeatureModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./main/main-feature.module').then(m => m.MainFeatureModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FeaturesModule { }
