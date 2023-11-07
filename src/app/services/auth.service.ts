import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import {User} from "../models/User"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token=sessionStorage.getItem("token")
  private userSub=new BehaviorSubject<null|"pending"|User>(this.token?"pending":null)
  user$=this.userSub.asObservable()
  constructor() { }
  isEmailUnique(mail:string){
    return of(true)
  }
  signUp(user:{mail:string,password:string,firstName:string,lastName:string,phone:string}){
    return of(true)
  }

}
