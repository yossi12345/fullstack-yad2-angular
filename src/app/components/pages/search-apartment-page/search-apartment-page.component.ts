import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, of } from 'rxjs';
import { SEARCH_FILTERS, SEARCH_ORDER_BY, getKeyByValue } from 'src/app/Dictionaries';
import { Apartment } from 'src/app/models/Apartment';
import { ApartmentType } from 'src/app/models/ApartmentType';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-apartment-page',
  templateUrl: './search-apartment-page.component.html',
  styleUrls: ['./search-apartment-page.component.scss']
})
export class SearchApartmentPageComponent implements OnInit,OnDestroy{
  features!:string[]
  apartmentTypes!:ApartmentType[]
  subscriber!:Subscription
  orderByPossibilities=Object.keys(SEARCH_ORDER_BY)
  orderBy=this.orderByPossibilities[0]
  filterPossibilities=Object.keys(SEARCH_FILTERS)
  filters:string[]=[]
  searchFirstTime!:any
  apartments:Apartment[]=[]
  apartmentTotal!:number
  constructor(private route:ActivatedRoute,private http:HttpClient,private authService:AuthService){}
  ngOnInit(): void {
    this.subscriber=this.route.data.subscribe(res=>{
      this.features=res['features']
      this.apartmentTypes=res["types"]
      this.searchFirstTime=res['searchApartments'].search
      console.log("f",res['searchApartments'])
      if (res['searchApartments'].search.filters){
        res['searchApartments'].search.filters.forEach((filter:string)=>{
          const filterKey=getKeyByValue(SEARCH_FILTERS,filter)
          if (filterKey)
            this.filters.push(filterKey)
        })
      }
      if (res['searchApartments'].search.orderBy){
        const orderKey=getKeyByValue(SEARCH_ORDER_BY,res['searchApartments'].search.orderBy)
        if (orderKey)
          this.orderBy=orderKey
      }
      this.apartments=res['searchApartments'].apartments??[]
      this.apartmentTotal=res['searchApartments'].total
    })
  }
  onSearch(search:any,page:number=1){
    console.log(search,this.orderBy,this.filters)
    const filters:(string|number|null)[]=[]
    this.filters.forEach((filter)=>{
      filters.push(SEARCH_FILTERS[filter])
    })
    const user=this.authService.getUser()
    if (search.features)
      search.features=search.features.map((feature:string)=>({name:feature}))
   // if (user==="pending"||user===null||page>1)
      this.http.post(environment.SERVER_URL+'apartment/search',{
        ...search,
        filters,
        orderBy:SEARCH_ORDER_BY[this.orderBy]
      }).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.apartments=res.apartments as Array<Apartment>
          this.apartmentTotal=res.total
        },
        error:(err)=>{
          console.log(err)
          this.apartmentTotal=0
          this.apartments=[]
        }
      })
    // else{
    //   const headers=new HttpHeaders({
    //     'Authorization':'Bearer '+this.authService.getToken()
    //   })
    //   this.http.post(environment.SERVER_URL+'apartment/new-search',{
    //     ...search,
    //     filters,
    //     orderBy:SEARCH_ORDER_BY[this.orderBy]
    //   },{headers}).subscribe({
    //     next:(res)=>{
    //       this.apartments=res as Array<Apartment>
    //     },
    //     error:(err)=>{
    //       console.log(err)
    //       this.apartments=[]
    //     }
    //   })
    // }


    // this.router.navigate(['search-apartment'],{
    //   queryParams:{
    //     ...search,
    //     apartmentTypes:JSON.stringify(search.apartmentTypes),
    //     orderBy:SEARCH_ORDER_BY[this.orderBy],
    //     filters
    //   }}
  }
  onChangeFilter(filter:string){
    const index=this.filters.indexOf(filter)
    if (index===-1)
      this.filters.push(filter)
    else
      this.filters.splice(index,1)
  }
  clearFilters(){
    this.filters=[]
  }
  onChangeOrderBy(orderBy:string){
    this.orderBy=orderBy
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
}
