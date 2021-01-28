import { NgModule } from '@angular/core';
import { DashboardPagComponent } from './dashboard-pag.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [DashboardPagComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardPagComponent
      }
    ])
  ]
})
export class DashboardPageModule { }
