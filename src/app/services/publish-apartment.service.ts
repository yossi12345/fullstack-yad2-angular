import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublishApartmentService {
  private stepOpenIndexSub=new BehaviorSubject<number>(1)
  stepOpenIndex$=this.stepOpenIndexSub.asObservable()  

  private amountOfSteps=7
  private apartmentData:object[]
  constructor(private http:HttpClient,private authService:AuthService) {
    const apartmentData=sessionStorage.getItem("apartmentData")
    this.apartmentData=apartmentData?JSON.parse(apartmentData):[]
    if (this.apartmentData.length>0)
      this.stepOpenIndexSub.next(this.apartmentData.length>=5?5:this.apartmentData.length)
  }
  getStepData(step:number){
    return this.apartmentData[step-1]
  }
  getAmountOfSteps(){
    return this.amountOfSteps
  }
  navigateToSpecificStep(step:number){
    this.stepOpenIndexSub.next(step)
  }
  onSubmitStep(step:number,data:object){
    this.apartmentData[step-1]=data
    sessionStorage.setItem('apartmentData',JSON.stringify(this.apartmentData))
    if (step!==this.amountOfSteps)
      this.stepOpenIndexSub.next(step+1)
    else
      this.createApartment()
  }
  createApartment(){
    const form =new FormData()
    this.apartmentData.forEach((step:any)=>{
        for (const field in step){
          switch(field){
            case 'files':
              console.log("HG")
              step[field].forEach((file:File)=>{
                form.append(field,file,file.name)
              })
              console.log("HGr")
            break
            case 'video':
            case 'mainFile':
              if (step[field])
                form.append(field,step[field],step[field].name)
              break
            case "phones":
              form.append(field,JSON.stringify(step[field]))
              break
            default:
              if (Array.isArray(step[field])){
                step[field].forEach((el:any)=>{
                  form.append(field,el)
                })
              }
              else
                form.append(field,step[field])
              console.log(field,step[field])
              break
          }
        } 
    })
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+this.authService.getToken()
    })
    this.http.post(environment.SERVER_URL+"apartment",form,{headers}).pipe(
      catchError((err:any)=>{
        console.log({err})
        return of(false)
      })
    ).subscribe(res=>{
      console.log({res})
    })
  }
  getTypes(){
    return this.http.get(environment.SERVER_URL+"apartment/types").
      pipe(
        catchError((err)=>{
          console.log(err)
          return of(null)
        }),
      )
  }
  getFeatures(){
    return this.http.get(environment.SERVER_URL + 'apartment/features').
      pipe(
        catchError(err=>{
          console.log(err)
          return of(null)
        })
      )
  }
}
