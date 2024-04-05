import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    loadComponent: () => import('./_layouts/general/general.component').then(m => m.GeneralComponent),
    loadChildren: () => import('./_shared/general.routes').then(m => m.routes)
  }
];
