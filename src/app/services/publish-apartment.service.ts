import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublishApartmentService {
  private stepOpenIndexSub=new BehaviorSubject<number>(6)//לא ניתן לשמור תמונות במחסן ולכן לא מדלגים על שלב 5
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
  getCities(search:string){
    const q=JSON.stringify({['שם_ישוב']:search+":*"})
    return this.http.get('https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&distinct=true&fields=שם_ישוב&sort=שם_ישוב&q='+q).
      pipe(map((res:any)=>
        (res.result.records as Array<any>).map(obj=>obj['שם_ישוב'])
      ))
  }
  getStreets(search:string){
    const q=JSON.stringify({['שם_רחוב']:search+":*"})
    return this.http.get('https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&distinct=true&fields=שם_רחוב&sort=שם_רחוב&q='+q).
      pipe(map((res:any)=>
        (res.result.records as Array<any>).map(obj=>obj['שם_רחוב'])
      ))
  }
}
