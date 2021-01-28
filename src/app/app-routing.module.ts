import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main-layout/main-layout.module')
      .then(module => module.MainLayoutModule),
    pathMatch: 'full'
  },
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(module => module.AdminModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
