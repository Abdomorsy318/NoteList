import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
 if(localStorage.getItem("tokenToDo") !== null)
 {
  req = req.clone({
    setHeaders:{token : '3b8ny__' + localStorage.getItem('tokenToDo')}
  })
 }
  return next(req);
};
