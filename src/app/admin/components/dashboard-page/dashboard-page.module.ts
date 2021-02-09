import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './dashboard-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CategoryPipe } from './pipes/category.pipe';

@NgModule({
  declarations: [DashboardPageComponent, SearchPipe, CategoryPipe],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardPageComponent
      }
    ])
  ]
})
export class DashboardPageModule { }
