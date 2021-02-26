import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { IPet } from 'src/app/shared/interfaces';
import { SubscriptionHelper, Subscriptions } from 'src/app/shared/helpers/subscription.helper';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent implements OnInit, OnDestroy {
  public petForm!: FormGroup;
  public petId!: string;
  public submited: boolean = false;

  private pet!: IPet;
  private subs: Subscriptions = {};

  constructor(
    public petService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.subs.routeSubscription = this.route.params.subscribe((res) => {
      this.petId = res['id'];
      this.subs.productSubscription = this.petService.getPetId(res['id']).subscribe((res) => {
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
    this.subs.removeSubscription = this.petService.removePet(id).subscribe(() => {
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

    this.subs.editSubscription = this.petService.editPet(this.pet).subscribe(() => {
      this.submited = false;
      this.router.navigate(['/admin', 'dashboard']);
      console.log('Животное отредактировано');
    });
  }

  ngOnDestroy() {
    SubscriptionHelper.unsubscribe(this.subs);
  }
}
