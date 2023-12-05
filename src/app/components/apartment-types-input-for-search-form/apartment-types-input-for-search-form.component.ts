import {Component,EventEmitter,Input,OnInit,Output} from '@angular/core';
import { ApartmentType } from 'src/app/models/ApartmentType';

@Component({
  selector: 'app-apartment-types-input-for-search-form',
  templateUrl: './apartment-types-input-for-search-form.component.html',
  styleUrls: ['./apartment-types-input-for-search-form.component.scss']
})
export class ApartmentTypesInputForSearchFormComponent implements OnInit{
  @Input() apartmentTypes:ApartmentType[]=[]
  @Output() changeChosenApartmentTypes=new EventEmitter()
  @Input() chosenApartmentTypesFirstTime!:ApartmentType[]
  apartmentTypesDividedToCategories:any={}
  chosenApartmentTypesDividedToCategories:any={}
  openApartmentTypeCategory:string|null=null
  shouldDropOpen:boolean=false
  get inputValue(){
    let result:number=0
    for (const category in this.chosenApartmentTypesDividedToCategories)
      result+=this.chosenApartmentTypesDividedToCategories[category].length
    return (result===this.apartmentTypes.length||result===0)?"":(result+" סוגי נכסים")
  }
  ngOnInit(): void {
    this.apartmentTypes.forEach(type=>{
      if (!this.apartmentTypesDividedToCategories[type.category]){
        this.apartmentTypesDividedToCategories[type.category]=[type.name]
        this.chosenApartmentTypesDividedToCategories[type.category]=[]
      }
      else
        this.apartmentTypesDividedToCategories[type.category].push(type.name)
    })
    if (this.chosenApartmentTypesFirstTime)
      this.chosenApartmentTypesFirstTime.forEach(type=>{
        this.chosenApartmentTypesDividedToCategories[type.category].push(type.name)
      })
    
  }
  get apartmentTypeCategories(){
    return Object.keys(this.apartmentTypesDividedToCategories)
  }
  toggleApartmentType(category:string,event:Event){
    event.stopPropagation()
    this.openApartmentTypeCategory=this.openApartmentTypeCategory===category?null:category
  }
  openDrop(){
    this.shouldDropOpen=true
  }
  closeDrop(){
    this.shouldDropOpen=false
  }
  toggleDrop(){
    this.shouldDropOpen=!this.shouldDropOpen
  }
  updateChosenApartmentTypes(category:string,name?:string){
    if (category==="everything"){ 
      if (!this.apartmentTypeCategories.every(category=>this.chosenApartmentTypesDividedToCategories[category].length===this.apartmentTypesDividedToCategories[category].length))
        this.chosenApartmentTypesDividedToCategories={...this.apartmentTypesDividedToCategories}
      else
        for (const category in this.chosenApartmentTypesDividedToCategories)
          this.chosenApartmentTypesDividedToCategories[category]=[]
    }
    else if (name===undefined){
      if (this.chosenApartmentTypesDividedToCategories[category].length===this.apartmentTypesDividedToCategories[category].length)
      this.chosenApartmentTypesDividedToCategories[category]=[]
    else
      this.chosenApartmentTypesDividedToCategories[category]=[...this.apartmentTypesDividedToCategories[category]]
    }
    else{
      const index=this.chosenApartmentTypesDividedToCategories[category].findIndex((typeName:string)=>typeName===name)
      if (index===-1)
        this.chosenApartmentTypesDividedToCategories[category].push(name)
      else
        this.chosenApartmentTypesDividedToCategories[category].splice(index,1)
    }
    const result:ApartmentType[]=[]
    for (const category in this.chosenApartmentTypesDividedToCategories){
      this.chosenApartmentTypesDividedToCategories[category].forEach((typeName:string)=>{
        result.push({category,name:typeName})
      })
    }
    this.changeChosenApartmentTypes.emit(result)
  }
  isApartmentTypeChosen(category:string,name:string){
    return this.chosenApartmentTypesDividedToCategories[category].some((typeName:string)=>typeName===name)
  }
}
