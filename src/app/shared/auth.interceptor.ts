import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Router } from '@angular/router';
import { AuthService } from "./services/auth.service";
import { catchError } from 'rxjs/operators';
import { identifierModuleUrl } from "@angular/compiler";

@Injectable()
export class AuthInterseptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return next.handle(req)
  .pipe(
    catchError(error => {
      if(error === 401) {
        this.auth.logout()
        this.router.navigate(['/admin', 'login'])
      }
      return throwError(error)
    })
  )
  }

}
