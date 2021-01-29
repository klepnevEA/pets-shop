import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './dashboard-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardPageComponent
      }
    ])
  ]
})
export class DashboardPageModule { }
