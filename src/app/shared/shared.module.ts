import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    AlifeFileToBase64Module
  ],
  exports: [
    CommonModule,
    AlifeFileToBase64Module
  ]
})
export class SharedModule { }
