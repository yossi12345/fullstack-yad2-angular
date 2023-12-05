import { Component, EventEmitter, Input ,OnInit, Output,OnChanges,SimpleChanges} from '@angular/core';
import {  NgForm } from '@angular/forms';
import { ApartmentType } from 'src/app/models/ApartmentType';
import { SearchPlacesService } from 'src/app/services/search-places.service';

@Component({
  selector: 'app-search-apartment-form',
  templateUrl: './search-apartment-form.component.html',
  styleUrls: ['./search-apartment-form.component.scss'],
  providers:[SearchPlacesService]
})
export class SearchApartmentFormComponent implements OnInit,OnChanges{
  @Input() apartmentTypes!:ApartmentType[]
  @Input() apartmentFeatures!:string[]
  @Input() searchFirstTime?:any
  @Input() chosenApartmentTypesFirstTime:ApartmentType[]=[]
  today=new Date().toISOString().split('T')[0]
  streets:string[]=[]
  cities:string[]=[]
  minAmountOfRoomsPossibilities:{all:("הכל"|number)[],available:("הכל"|number)[]}={all:[],available:[]}
  maxAmountOfRoomsPossibilities:{all:("הכל"|number)[],available:("הכל"|number)[]}={all:[],available:[]}
  minFloorsPossibilities:{all:("הכל"|number)[],available:("הכל"|number)[]}={all:[],available:[]}
  maxFloorsPossibilities:{all:("הכל"|number)[],available:("הכל"|number)[]}={all:[],available:[]}
  chosenApartmentTypes:ApartmentType[]=[]
  amountOfRoomsInput:string|null=null
  minFloor!:number|null
  maxFloor!:number|null
  minAmoutOfRooms!:number|null
  maxAmoutOfRooms!:number|null
  chosenFeatures:string[]=[]
  showAdvancedSearch:boolean=false
  isImmidiateEntryDate!:boolean
  inputs:any={
    minArea:"",
    maxArea:"",
    freeSearch:"",
    entryDate:"",
    minPrice:"",
    maxPrice:"",
    place:"",
  }
  @Output() onSearch=new EventEmitter()
  constructor(private searchPlacesService:SearchPlacesService){}
  ngOnChanges(changes:SimpleChanges){
    if (!changes['searchFirstTime'].currentValue) return 
  }
  ngOnInit(): void {
    this.minAmountOfRoomsPossibilities.all.push("הכל")
    this.maxAmountOfRoomsPossibilities.all.push("הכל")
    for (let i=1;i<=12;i+=0.5){
      this.minAmountOfRoomsPossibilities.all.push(i)
      this.maxAmountOfRoomsPossibilities.all.push(i)
    }
    this.minFloorsPossibilities.all.push("הכל")
    this.maxFloorsPossibilities.all.push("הכל")
    for (let i=0;i<=17;i++){
      this.minFloorsPossibilities.all.push(i)
      this.maxFloorsPossibilities.all.push(i)
    }
    if (!this.searchFirstTime){
      this.handleRoomsInputChange("min")
      this.handleRoomsInputChange("max")
      this.handleFloorInputChange("min")
      this.handleFloorInputChange("max")
      return
    }
    this.chosenFeatures=this.searchFirstTime.features??[]
    this.chosenApartmentTypes=this.searchFirstTime.apartmentTypes??[]
    this.chosenApartmentTypesFirstTime=this.searchFirstTime.apartmentTypes??[]
    this.isImmidiateEntryDate=this.searchFirstTime.immidiateEntry?true:false
    this.handleRoomsInputChange("min",this.searchFirstTime.minAmountOfRooms)
    this.handleRoomsInputChange("max",this.searchFirstTime.maxAmoutOfRooms)
    this.handleFloorInputChange("min",this.searchFirstTime.minFloor)
    this.handleFloorInputChange("max",this.searchFirstTime.maxFloor)
    for (const field in this.inputs){
      if (field==='place'&&this.searchFirstTime.city){
        this.inputs.place=this.searchFirstTime.city+", "
        if (this.searchFirstTime.street)
          this.inputs.place+=this.searchFirstTime.street
      }
      else if (this.searchFirstTime[field]){
        if (field!=="entryDate")
          this.inputs[field]=this.searchFirstTime[field]
        else
          this.inputs[field]=new Date(this.searchFirstTime[field]).toISOString().split('T')[0]
      }
    }
    console.log("i",this.searchFirstTime,this.amountOfRoomsInput)
  }
  toggleIsImmidiateEntryDate(){
    this.isImmidiateEntryDate=!this.isImmidiateEntryDate
  }
  toggleAdvancedSearch(){
    this.showAdvancedSearch=!this.showAdvancedSearch
  }
  updateChosenApartmentType(newValue:ApartmentType[]){
    this.chosenApartmentTypes=newValue
  }
  get amountOfValuesInAdvancedSearch(){
    return this.chosenFeatures.length+
      (this.minFloor?1:0)+(this.maxFloor?1:0)+
      (this.inputs.minArea?1:0)+(this.inputs.maxArea?1:0)+
      (this.isImmidiateEntryDate?1:0)+
      (this.inputs.freeSearch?1:0)+(this.inputs.entryDate?1:0)
  }
  findPlaces(){
    if (!this.inputs.place) return 
    const [city,street]=this.inputs.place.split(", ")
    if (street)
      this.searchPlacesService.getStreets(street).subscribe(streets=>{
        this.streets=streets
      })
    else
      this.searchPlacesService.getCities(city).subscribe(cities=>{
        this.cities=cities
      })
  }
  handleChangePlace(place:string,category:"city"|"street",event:Event){
    if (category==="city"){
      event.preventDefault()
      this.inputs.place=place+", "
    }
    else
      this.inputs.place+=place
  }
  updateFeatures(isChecked:boolean,feature:string){
    if (!isChecked){
      this.chosenFeatures.push(feature)
    }
    else{
      this.chosenFeatures.splice(this.chosenFeatures.indexOf(feature),1)
    }
  }
  onChangeInputNumber(event:Event,inputName:string){
    const newValue=(event.target as HTMLInputElement).value.replace(/[^0-9]/g, '');
    (event.target as HTMLInputElement).value=newValue
    this.inputs[inputName]=newValue
  }
  handleRoomsInputChange(category:"min"|"max",value:string|number="הכל"){
    if (category==="min"){
      if (value==="הכל"){
        this.minAmoutOfRooms=null
        this.maxAmountOfRoomsPossibilities.available=[...this.maxAmountOfRoomsPossibilities.all]
      }
      else {
        const valueHere=value as number
        this.minAmoutOfRooms=valueHere
        this.maxAmountOfRoomsPossibilities.available=this.maxAmountOfRoomsPossibilities.all.filter(p=>p==="הכל"||p>=valueHere)
      }
    }
    else{
      if (value==="הכל"){
        this.maxAmoutOfRooms=null
        this.minAmountOfRoomsPossibilities.available=[...this.minAmountOfRoomsPossibilities.all]
      }
      else{
        const valueHere=value as number
        this.maxAmoutOfRooms=valueHere
        this.minAmountOfRoomsPossibilities.available=this.minAmountOfRoomsPossibilities.all.filter(p=>p==="הכל"||p<=valueHere)
      }
    }
    if (this.minAmoutOfRooms===null)
        this.amountOfRoomsInput=this.maxAmoutOfRooms===null?null:("עד- "+this.maxAmoutOfRooms)
    else if (this.maxAmoutOfRooms===null)
      this.amountOfRoomsInput="מ- "+this.minAmoutOfRooms
    else
      this.amountOfRoomsInput=this.minAmoutOfRooms+" - "+this.maxAmoutOfRooms
  }
  handleFloorInputChange(category:"min"|"max",value:string|number="הכל"){
    if (category==="min"){
      if (value==="הכל"){
        this.minFloor=null
        this.maxFloorsPossibilities.available=[...this.maxFloorsPossibilities.all]
      }
      else{
        const valueHere=value as number
        this.minFloor=valueHere
        this.maxFloorsPossibilities.available=this.maxFloorsPossibilities.all.filter(p=>p==="הכל"||p>=valueHere)
      }
    }
    else{
      if (value==="הכל"){
        this.maxFloor=null
        this.minFloorsPossibilities.available=[...this.minFloorsPossibilities.all]
      }
      else{
        const valueHere=value as number
        this.maxFloor=valueHere
        this.minFloorsPossibilities.available=this.minFloorsPossibilities.all.filter(p=>p==="הכל"||p<=valueHere)
      }
    }
  }
  clearForm(form:NgForm){
    form.resetForm()
    this.handleFloorInputChange('min','הכל')
    this.handleFloorInputChange('max',"הכל")
    this.handleRoomsInputChange('max',"הכל")
    this.handleRoomsInputChange('min',"הכל")
    this.chosenApartmentTypes=[]
    this.chosenFeatures=[]
    console.log(form)
  }
  onSubmit(){
    const search:any={}
    if (this.inputs.place){
      const [city,street]=this.inputs.place.split(", ")
      search.city=city
      if (street)
        search.street=street
    }
    const replaceMinMax=(property:string)=>{
      this.inputs
      const minCopy=search['min'+property]
      search['min'+property]=search['max'+property]
      search['max'+property]=minCopy
      this.inputs['min'+property]=search['min'+property]
      this.inputs['max'+property]=search['max'+property]
    }
    if (this.inputs.minPrice)
      search.minPrice=this.inputs.minPrice*1
    if (this.inputs.maxPrice)
      search.maxPrice=this.inputs.maxPrice*1
    if (this.inputs.maxArea)
      search.maxArea=this.inputs.maxArea*1
    if (this.inputs.minArea)
      search.minArea=this.inputs.minArea*1
    if (this.inputs.entryDate)
      search.entryDate=this.inputs.entryDate
    search.apartmentTypes=this.chosenApartmentTypes
    search.features=this.chosenFeatures
    if (this.minFloor)
      search.minFloor=this.minFloor*1
    if (this.maxFloor)
      search.maxFloor=this.maxFloor*1
    if (this.minAmoutOfRooms)
      search.minAmountOfRooms=this.minAmoutOfRooms*1
    if (this.maxAmoutOfRooms)
      search.maxAmoutOfRooms=this.maxAmoutOfRooms*1
    if (this.isImmidiateEntryDate)
      search.immidiateEntry=true
    if (this.inputs.freeSearch)
      search.freeSearch=this.inputs.freeSearch
    if (search.minPrice>search.maxPrice)
      replaceMinMax("Price")
    if (search.minArea>search.maxArea)
      replaceMinMax("Area")
    this.onSearch.emit(search)
  }
}
