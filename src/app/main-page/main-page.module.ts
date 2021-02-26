import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PetComponent } from './main-page/pet/pet.component';

@NgModule({
  declarations: [MainPageComponent, PetComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainPageComponent,
      },
    ]),
  ],
})
export class MainPageModule {}
