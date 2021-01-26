import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent, children: [
      {
        path: '',
        loadChildren: () => import('../main-page/main-page.module')
          .then(module => module.MainPageModule)
      },
      {
        path: 'product/:id',
        loadChildren: () => import('../product-page/product-page.module')
          .then(module => module.ProductPageModule)
      },
      {
        path: 'card',
        loadChildren: () => import('../card-page/card-page.module')
          .then(module => module.CardPageModule)
      },
      {
        path: '**',
        loadChildren: () => import('../not-found/not-found.module')
          .then(module => module.NotFoundModule)
      }
    ]
  }
];

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MainLayoutModule { }
