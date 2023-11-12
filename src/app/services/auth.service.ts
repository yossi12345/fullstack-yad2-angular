import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, first, map, of, tap } from 'rxjs';
import {User} from "../models/User"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token=sessionStorage.getItem("token")
  private userSub=new BehaviorSubject<null|"pending"|User>(this.token?"pending":null)
  user$=this.userSub.asObservable()
  constructor(private http:HttpClient) {
    console.log("tret")
    this.updateUserFirstTime()
  }
  isEmailAlreadyExist(email:string){
    console.log("hhh",email)
    return this.http.post(environment.SERVER_URL+"auth/check-email",{email}).
    pipe(catchError((err)=>{
      console.log(err)
      return of(true)
    }))
  }
  signUp(user:User,password:string){
    return this.http.post(environment.SERVER_URL+"auth",{...user,password}).pipe(
      tap((res)=>{
        if (res)
          this.handleSignSuccessfully(res)
      }),
      catchError((err)=>{
        console.log(err)
        return of(false)
      }),
      map(res=>res?true:false)
    )
  }
  signIn(mail:string,password:string){
    if (!(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(password)))
      return of(false)
    return this.http.post(environment.SERVER_URL+"auth/login",{mail,password}).pipe(
      tap((res)=>{
        if (res)
          this.handleSignSuccessfully(res)
      }),
      catchError((err)=>{
        console.log(err)
        return of(false)
      }),
      map(res=>res?true:false)
    )
  }
  handleSignSuccessfully(res:any){
    console.log("tap",res)
    this.token=res.token
    sessionStorage.setItem('token',res.token)
    const user={  
      firstName:res.firstName,
      lastName:res.lastName,
      mail:res.mail,
      phone:res.phone,
      apartmentsForSelling:res.apartmentsForSelling,
      favoriteApartments:res.favoriteApartments,
      lastApartmentSearches:res.lastApartmentSearches
    }
    this.userSub.next(user)
  }
  updateUserFirstTime(){
    if (!this.token)return
    const headers=new HttpHeaders({
      "Authorization":"Bearer "+this.token
    })
    this.http.get(environment.SERVER_URL+"auth",{headers}).
      pipe(first()).
      subscribe((res)=>{
        this.userSub.next(res?(res as User):null)
      })
  }
  signOut(){
    this.userSub.next(null)
    sessionStorage.removeItem("token")
    this.token=null
  }
}
