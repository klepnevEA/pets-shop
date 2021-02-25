import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { SearchPipe } from './pipes/search.pipe';
import { CategoryPipe } from './pipes/category.pipe';

@NgModule({
  declarations: [SearchPipe, CategoryPipe],
  imports: [CommonModule, RouterModule, AlifeFileToBase64Module],
  exports: [CommonModule, AlifeFileToBase64Module, SearchPipe, CategoryPipe],
})
export class SharedModule {}
