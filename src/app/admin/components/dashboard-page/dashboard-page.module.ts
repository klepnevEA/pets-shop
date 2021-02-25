import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './dashboard-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardPageComponent,
      },
    ]),
  ],
})
export class DashboardPageModule {}
