import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [

  {
    path: '',
    component: AdminLayoutComponent, children: [
      {path: '', redirectTo: './components/admin/login', pathMatch: 'full'},
      {
        path: 'login',
        loadChildren: () => import('./components/login-page/login-page.module')
          .then(module => module.LoginPageModule)
      },
      {
        path: 'orders',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import('./components/orders-page/orders-page.module')
          .then(module => module.OrdersPageModule)
      },
      {
        path: 'edit',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import('./components/edit-page/edit-page.module')
          .then(module => module.EditPageModule)
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import('./components/dashboard-page/dashboard-page.module')
          .then(module => module.DashboardPageModule)
      },
      {
        path: 'product',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import('./components/add-product-page/add-product-page.module')
          .then(module => module.AddProductPageModule)
      }
    ]
  }
];

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  providers: [AuthGuard]
})
export class AdminModule { }
