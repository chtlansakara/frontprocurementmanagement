import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../common/services/spinner.service';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {

  //get service class as dependency
  const spinnerService  = inject(SpinnerService);

  //show the progress-spinner
  spinnerService.show();

  //skip spinner if needed
  if (req.headers.get('X-Skip-Spinner')) {
  return next(req);
}


  return next(req).pipe(
    finalize(()=> spinnerService.hide())
  );
};
