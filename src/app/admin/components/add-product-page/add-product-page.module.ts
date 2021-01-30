import { NgModule } from '@angular/core';
import { AddProductPageComponent } from './add-product-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [AddProductPageComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AngularEditorModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddProductPageComponent
      }
    ])
  ]
})
export class AddProductPageModule { }
