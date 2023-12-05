import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export const searchApartmentsResolver: ResolveFn<any> = (route, state) => {
  const search={...route.queryParams}
  const http=inject(HttpClient)
  if (route.queryParams['apartmentTypes'])
    search['apartmentTypes']=JSON.parse(route.queryParams['apartmentTypes'])
  if (search['minPrice'])
    search['minPrice']*=1
  if (search['maxPrice'])
    search['maxPrice']*=1
  if (search['maxArea'])
    search['maxArea']*=1
  if (search['minArea'])
    search['minArea']*=1
  if (search['entryDate'])
    search['entryDate']=new Date(search['entryDate'])
  if (search['minFloor'])
    search['minFloor']*=1
  if (search['maxFloor'])
    search['maxFloor']*=1
  if (search['minAmoutOfRooms'])
    search['minAmountOfRooms']*=1
  if (search['maxAmoutOfRooms'])
    search['maxAmoutOfRooms']*=1
  console.log("RR",search)
  return http.post(environment.SERVER_URL+'apartment/search',search).pipe(
    catchError((err)=>{
      console.log(err)
      return of({search,apartments:[],total:0})
    }),
    map((res:any)=>({...res,search}))
  )

};
