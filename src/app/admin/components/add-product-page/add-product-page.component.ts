import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Ipet } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductPageComponent implements OnInit {

  form!: FormGroup
  public submited: boolean = false
  public pet!: Ipet

  constructor(
    private petService : ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      photo: new FormControl(null, [Validators.required]),
      info: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    })

  }

  addPet() {
    if (this.form.invalid) {
      return
    }

    this.submited = true

    this.pet = {
      type: this.form.value.email,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date()
    }

    this.petService.addPet(this.pet).subscribe(res => {
      this.form.reset()
      this.submited = false
      console.log('Животное добавлено')
    })
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
  }

  uploadImage: AngularEditorConfig = {
    editable: true,
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };
}
