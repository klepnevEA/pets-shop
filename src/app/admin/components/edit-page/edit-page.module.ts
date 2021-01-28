import { NgModule } from '@angular/core';
import { EditPageComponent } from './edit-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [EditPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditPageComponent
      }
    ])
  ]
})
export class EditPageModule { }
