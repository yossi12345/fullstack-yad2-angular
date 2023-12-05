import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map,catchError,of} from 'rxjs'
@Injectable()
export class SearchPlacesService {
  private url='https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&distinct=true&'
  constructor(private http:HttpClient){}
  getCities(search:string){
    const q=JSON.stringify({['שם_ישוב']:search+":*"})
    return this.http.get(this.url+'fields=שם_ישוב&sort=שם_ישוב&q='+q).
      pipe(map((res:any)=>
        (res.result.records as Array<any>).map(obj=>obj['שם_ישוב'])
      ),catchError((err)=>{
        console.log(err)
        return of([])
      }))
  }
  getStreets(search:string){
    const q=JSON.stringify({['שם_רחוב']:search+":*"})
    return this.http.get(this.url+'fields=שם_רחוב&sort=שם_רחוב&q='+q).
      pipe(map((res:any)=>
        (res.result.records as Array<any>).map(obj=>obj['שם_רחוב'])
      ),catchError((err)=>{
        console.log(err)
        return of([])
      }))
  }
}
