import { NgModule } from '@angular/core';
import { EditPageComponent } from './edit-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule({
  declarations: [EditPageComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AngularEditorModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditPageComponent
      }
    ])
  ]
})
export class EditPageModule { }
