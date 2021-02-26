import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../main-page/main-page.module').then((module) => module.MainPageModule),
      },
      {
        path: 'product/:id',
        loadChildren: () =>
          import('../product-page/product-page.module').then((module) => module.ProductPageModule),
      },
      {
        path: 'card',
        loadChildren: () =>
          import('../card-page/card-page.module').then((module) => module.CardPageModule),
      },
      {
        path: 'registration',
        loadChildren: () =>
          import('../registration/registration.module').then((module) => module.RegistrationModule),
      },
      {
        path: '**',
        loadChildren: () =>
          import('../not-found/not-found.module').then((module) => module.NotFoundModule),
      },
    ],
  },
];

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class MainLayoutModule {}
