import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../auth/services/storage.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  //get token from storage
  const token = StorageService.getToken();
  //replace the http request
  const reqAuth = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })
  //return new request
  return next(reqAuth);
};
