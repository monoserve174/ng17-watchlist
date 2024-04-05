import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: ''
    , pathMatch: 'full'
    , redirectTo: 'home'
  }
  , {
    path: 'home'
    , loadComponent: () => import('../components/home/home.component').then(m => m.HomeComponent)
  }
  , {
    path: 'login'
    , loadComponent: () => import('../components/login/login.component').then(m => m.LoginComponent)
  }
];
