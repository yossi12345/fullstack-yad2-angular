import { Component, Input, OnInit } from '@angular/core';
import {  FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { APARTMENT_AMOUNT_OF_BALCONY, APARTMENT_AMOUNT_OF_PARKING_PLACES, APARTMENT_AMOUNT_OF_SHOWER_ROOMS, getKeyByValue } from 'src/app/Dictionaries';
import { PublishApartmentService } from 'src/app/services/publish-apartment.service';

@Component({
  selector: 'app-publish-apartment-step3',
  templateUrl: './publish-apartment-step3.component.html',
  styleUrls: ['./publish-apartment-step3.component.scss']
})
export class PublishApartmentStep3Component implements OnInit{
  summary:string=""
  step3Form!:FormGroup
  arrForAmountOfRooms:number[]=[0]
  @Input() features?:string[]
  isSubmitted:boolean=false
  textareaDetails!:{barColor?:string,description:string,descriptionColor:string,barWidth:string}
  arrForAmountOfShowerRooms=Object.keys(APARTMENT_AMOUNT_OF_SHOWER_ROOMS)
  arrForAmountOfParkingPlaces!:string[]
  arrForAmountOfBalcony!:string[]
  constructor(private fb:FormBuilder,private publishService:PublishApartmentService){}
  ngOnInit(): void {
    for (let i=1;i<=12.5;i+=0.5)
      this.arrForAmountOfRooms.push(i)

    const keys1=Object.keys(APARTMENT_AMOUNT_OF_PARKING_PLACES)
    this.arrForAmountOfParkingPlaces=[keys1.pop() as string,...keys1]
    const keys2=Object.keys(APARTMENT_AMOUNT_OF_BALCONY)
    this.arrForAmountOfBalcony=[keys2.pop() as string, ...keys2]

    const data:any=this.publishService.getStepData(3)
    this.step3Form=this.fb.group({
      amountOfRooms:[data?.amountOfRooms??1,[
        Validators.required
      ]],
      amountOfShowerRooms:[data?getKeyByValue(APARTMENT_AMOUNT_OF_SHOWER_ROOMS,data.amountOfShowerRooms):this.arrForAmountOfShowerRooms[0],[
        Validators.required
      ]],
      amountOfParkingPlaces:[data?getKeyByValue(APARTMENT_AMOUNT_OF_PARKING_PLACES,data.amountOfParkingPlaces):this.arrForAmountOfParkingPlaces[0],[
        Validators.required
      ]],
      amountOfBalcony:[data?getKeyByValue(APARTMENT_AMOUNT_OF_BALCONY,data.amountOfBalcony):this.arrForAmountOfBalcony[0],[
        Validators.required
      ]],
      description:[data?.description??''],
      features:this.getFormGroupForFeatures(data)
    })
    this.updateTextareaDetails(data?.description??'')
    this.summary=data?(data.amountOfRooms+" חדרים"):''
  }
  getFormGroupForFeatures(data:any){
    if (!this.features)
      return this.fb.group({})
    const result:FormGroup=this.fb.group({})
    this.features.forEach(feature=>{
      const controlFirstValue=!!data&&(data.features as Array<string>).includes(feature)
      result.addControl(feature,this.fb.control(controlFirstValue,[Validators.required]))     
    })
    return result
  }
  setInputValue(value:string,controlName:string){
    this.getControl(controlName).setValue(value)
  }
  showError(controlName:string){
    return this.isSubmitted&&this.getControl(controlName).invalid
  }
  getControl(controlName:string){
    return this.step3Form.get(controlName) as FormControl
  }
  get featuresFormArray():FormArray{
    return this.step3Form.get('features') as FormArray
  }
  updateTextareaDetails(inputValue?:string){
    const update=(barWidth:string,description:string,descriptionColor:string,barColor?:string)=>{
      this.textareaDetails={
        barWidth,description,descriptionColor,
        barColor:barColor??descriptionColor
      }
    }
    const value=inputValue??this.getControl('description').value
    if (value.length<4)
      update('0px','הידעת: מודעה ללא תיאור, כמעט ולא מקבלת שיחות','black')
    else if (value.length<8)
      update('13.15px','מרגיש לנו שהטקסט שכתבת קצר מידי','#ff2a2b')
    else if (value.length<32)
      update('92.02px','יופי, המודעה הולכת לכיוון הנכון','#ff7100')
    else if (value.length<104)
      update('100%','אוטוטו...','#fbaf02')
    else
      update('100%','בול!','#43c671')
  }
  handleChangeTextarea(){
    const control=this.getControl('description')
    if (control.value.length>400)
      control.setValue(control.value.slice(0,400))
    this.updateTextareaDetails(control.value)
  }
  onSubmit(){
    if (this.step3Form.invalid){
      this.isSubmitted=true
      return 
    }
    const data=this.step3Form.getRawValue()
    if (!data.description){
      const dataFromStep2:any=this.publishService.getStepData(2)
      const dataFromStep1:any=this.publishService.getStepData(1)
      if (dataFromStep1&&dataFromStep2){
        data.description=dataFromStep1.sellingType+", "+dataFromStep2.type+", קומה "+dataFromStep2.floor+", "+dataFromStep2.city
        this.getControl('description').setValue(data.description)
        this.updateTextareaDetails(data.description)
      }
    }
    const markedFeatures=[]
    for (const feature in data.features){
      if (data.features[feature])
        markedFeatures.push(feature)
    }
    data.features=markedFeatures
    this.summary=data.amountOfRooms+" חדרים"
    data.amountOfParkingPlaces=APARTMENT_AMOUNT_OF_PARKING_PLACES[data.amountOfParkingPlaces]
    data.amountOfBalcony=APARTMENT_AMOUNT_OF_BALCONY[data.amountOfBalcony]
    data.amountOfShowerRooms=APARTMENT_AMOUNT_OF_SHOWER_ROOMS[data.amountOfShowerRooms]
    this.publishService.onSubmitStep(3,data)
  }
  
}
