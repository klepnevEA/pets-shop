import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddProductPageComponent } from './add-product-page.component';

@NgModule({
  declarations: [AddProductPageComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AngularEditorModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddProductPageComponent,
      },
    ]),
  ],
})
export class AddProductPageModule {}
