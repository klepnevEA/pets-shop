import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoytComponent } from './admin-layoyt.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [

  {
    path: '',
    component: AdminLayoytComponent, children: [
      {path: '', redirectTo: './components/admin/login', pathMatch: 'full'},
      {
        path: 'login',
        loadChildren: () => import('./components/login-page/login-page.module')
          .then(module => module.LoginPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./components/orders-page/orders-page.module')
          .then(module => module.OrdersPageModule)
      },
      {
        path: 'edit',
        loadChildren: () => import('./components/edit-page/edit-page.module')
          .then(module => module.EditPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./components/dashboard-page/dashboard-page.module')
          .then(module => module.DashboardPageModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./components/add-product-page/add-product-page.module')
          .then(module => module.AddProductPageModule)
      }
    ]
  }
];

@NgModule({
  declarations: [AdminLayoytComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})
export class AdminModule { }
