import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        next: (event) =>
          event instanceof HttpResponse
            ? this.spinner.hide()
            : this.spinner.show(),
        complete: () => this.spinner.hide(),
      })
    );
  }
}
