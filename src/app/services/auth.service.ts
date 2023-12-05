import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, first, map, of, tap } from 'rxjs';
import {User} from "../models/User"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Apartment } from '../models/Apartment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token=sessionStorage.getItem("token")
  private userSub=new BehaviorSubject<null|"pending"|User>(this.token?"pending":null)
  user$=this.userSub.asObservable()
  constructor(private http:HttpClient) {
    this.updateUserFirstTime()
  }
  getUser(){
    return this.userSub.value
  }
  getToken(){
    return this.token
  }
  isEmailAlreadyExist(email:string){
    console.log("hhh",email)
    return this.http.post(environment.SERVER_URL+"account/check-email",{email}).
    pipe(catchError((err)=>{
      console.log(err)
      return of(true)
    }))
  }
  signUp(user:User,password:string){
    return this.http.post(environment.SERVER_URL+"account",{...user,password}).pipe(
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
    return this.http.post(environment.SERVER_URL+"account/login",{mail,password}).pipe(
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
    this.http.get(environment.SERVER_URL+"account",{headers}).
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
  likeApartment(apartment:Apartment){
    const user=this.userSub.value
    if (user===null||user==="pending")
      return of(false)
    const headers=new HttpHeaders({
      "Authorization":"Bearer "+this.token
    })
    return this.http.patch(environment.SERVER_URL+"account/like/"+apartment.id,{},{headers}).pipe(
      tap(res=>{
        if (!user.favoriteApartments)
          user.favoriteApartments=[]
        user.favoriteApartments.push(apartment)
        this.userSub.next(user)
      }),
      catchError(err=>{
        console.log(err)
        return of(false)
      })
    )
  }
  dislikeApartment(apartment:Apartment){
    const user=this.userSub.value
    if (user===null||user==="pending"||!user.favoriteApartments||user.favoriteApartments.length===0)
      return of(false)
    const headers=new HttpHeaders({
      "Authorization":"Bearer "+this.token
    })
    const apartmentIndex=user.favoriteApartments.findIndex(a=>a.id===apartment.id)
    if (apartmentIndex===-1)
      return of(false)
    return this.http.patch(environment.SERVER_URL+"account/dislike/"+apartment.id,{},{headers}).pipe(
      tap(res=>{
        user.favoriteApartments?.splice(apartmentIndex,1)
        this.userSub.next(user)
      }),
      catchError(err=>{
        console.log(err)
        return of(false)
      })
    )
  }
}
