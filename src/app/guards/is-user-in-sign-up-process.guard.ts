import { CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';

export const isUserInSignUpProcessGuard: CanActivateFn = (route, state) => {
  const password=sessionStorage.getItem("password")
  const mail=sessionStorage.getItem("mail")
  if (mail&&password)
    return true
  const router=inject(Router)
  router.navigate(['sign-up1'])
  return false
};
