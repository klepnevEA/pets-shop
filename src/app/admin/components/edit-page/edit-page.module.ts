import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditPageComponent } from './edit-page/edit-page.component';

@NgModule({
  declarations: [EditPageComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AngularEditorModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditPageComponent,
      },
    ]),
  ],
})
export class EditPageModule {}
