import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const matsnackbar = inject(MatSnackBar);
  return next(req).pipe(catchError((error:HttpErrorResponse)=>{
    console.log(error.error);
    console.log(`${error.name} of status ${error.status} occurred`);
    // console.log(error.message);

    if(error.status == 0){
      matsnackbar.open("No response from the server.", "Close", {duration: 5000, panelClass:[`snackbar-error`]});
    }else if(error.error){
      matsnackbar.open(error.error, "Close", {duration: 5000, panelClass:[`snackbar-error`]});
    }else{
      matsnackbar.open("Error connecting to server", "Close", {duration: 5000, panelClass:[`snackbar-error`]});
    }
    return throwError(()=> error);
  } ));
};
