import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublishApartmentService {
  private stepOpenIndexSub=new BehaviorSubject<number>(2)
  stepOpenIndex$=this.stepOpenIndexSub.asObservable()  

  private amountOfSteps=7
  private apartmentData:object[]
  constructor(private http:HttpClient) {
    const apartmentData=sessionStorage.getItem("apartmentData")
    this.apartmentData=apartmentData?JSON.parse(apartmentData):[]
  }
  getStepData(step:number){
    return this.apartmentData[step-1]
  }
  check(){
    console.log(this.stepOpenIndexSub.value)
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
    this.stepOpenIndexSub.next(step+1)
    console.log("s",step)
    this.check()
  }
  getTypes(){
    return this.http.get(environment.SERVER_URL+"PublishApartment/types").
      pipe(
        catchError((err)=>{
          console.log(err)
          return of(null)
        }),
      )
  }
  getFeatures(){
    return this.http.get(environment.SERVER_URL + 'PublishApartment/features').
      pipe(
        catchError(err=>{
          console.log(err)
          return of(null)
        })
      )
  }
  getCities(){
    this.http.get('https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&limit=20&offset=0&&plain=false&q={"שם_רחוב":"שבט:*","שם_ישוב":"חיפה"}').
    subscribe(res=>{
        console.log(res)
    })
  }

}
