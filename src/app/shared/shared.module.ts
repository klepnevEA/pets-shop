import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNemuComponent } from './components/user-nemu/user-nemu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UserNemuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    UserNemuComponent
  ]
})
export class SharedModule { }
