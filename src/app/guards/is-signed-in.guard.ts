import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {skip,map} from 'rxjs'
export const isSignedInGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService)
  const router=inject(Router)
  const user=authService.getUser()
  if (user===null){
    router.navigate(['sign-in?navigateTo='+route.routeConfig?.path])
    return false
  }
  if (user==="pending"){
    return authService.user$.pipe(skip(1),map(user=>{
      if (user)
        return true
      router.navigate(['sign-in?navigateTo='+route.routeConfig?.path])
      return false
    }))
  }
  return true;
};
