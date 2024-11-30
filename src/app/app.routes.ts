import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'productos',
    loadComponent: () => import('./pages/productos/productos/productos.page').then( m => m.ProductosPage)
  },
  {
    path: 'productos',
    loadComponent: () => import('./pages/productos/productos.page').then( m => m.ProductosPage)
  },
];
