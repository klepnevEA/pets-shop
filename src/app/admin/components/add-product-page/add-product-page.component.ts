import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IProduct } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductPageComponent implements OnInit {

  form!: FormGroup


  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      photo: new FormControl(null, [Validators.required]),
      info: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required])
    })

  }

  addProduct() {
    if (this.form.invalid) {
      return
    }
    const product: IProduct = {
      type: this.form.value.email,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
    }

    console.log(this.form)
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
  };
}
