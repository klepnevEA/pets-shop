import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAdmin } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  public form!: FormGroup;

  public submited: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const user: IAdmin = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true,
    };
    this.submited = true;

    this.auth.login(user).subscribe(
      (res) => {
        this.form.reset;
        this.router.navigate(['/admin', 'dashboard']);
        this.submited = false;
      },
      (err) => {
        this.submited = false;
      },
    );
  }
}
