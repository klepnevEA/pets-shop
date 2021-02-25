import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../../shared/services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ipet } from 'src/app/shared/interfaces';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent implements OnInit, OnDestroy {
  petForm!: FormGroup;
  pet!: Ipet;
  public petId!: string;
  public submited: boolean = false;
  private removeSubscription!: Subscription;
  private routeSubscription!: Subscription;
  private productSubscription!: Subscription;
  private editSubscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public petService: ProductService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((res) => {
      this.petId = res['id'];
      this.productSubscription = this.petService.getPetId(res['id']).subscribe((res) => {
        this.petForm = new FormGroup({
          type: new FormControl(res.type, [Validators.required]),
          title: new FormControl(res.title, [Validators.required]),
          photo: new FormControl(res.photo, [Validators.required]),
          info: new FormControl(res.info, [Validators.required]),
          price: new FormControl(res.price, [Validators.required]),
        });
        this.cdr.detectChanges();
      });
    });
  }

  removePet(id: any) {
    this.removeSubscription = this.petService.removePet(id).subscribe(() => {
      this.router.navigate(['/admin', 'dashboard']);
    });
  }

  goBack() {
    this.router.navigate(['/admin', 'dashboard']);
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
  };

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
        'fontName',
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
        'toggleEditorMode',
      ],
    ],
  };

  editPet() {
    if (this.petForm.invalid) {
      return;
    }

    this.submited = true;

    this.pet = {
      ...this.pet,
      id: this.petId,
      type: this.petForm.value.type,
      title: this.petForm.value.title,
      photo: this.petForm.value.photo,
      info: this.petForm.value.info,
      price: this.petForm.value.price,
      date: new Date(),
    };

    this.editSubscription = this.petService.editPet(this.pet).subscribe(() => {
      this.submited = false;
      this.router.navigate(['/admin', 'dashboard']);
      console.log('Животное отредактировано');
    });
  }

  ngOnDestroy() {
    if (this.removeSubscription) {
      this.removeSubscription.unsubscribe();
    }

    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }

    if (this.editSubscription) {
      this.editSubscription.unsubscribe();
    }
  }
}
