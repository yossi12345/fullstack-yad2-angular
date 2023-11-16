import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Condition,apartmentViews } from 'src/app/constants';
import { PublishApartmentService } from 'src/app/services/publish-apartment.service';

@Component({
  selector: 'app-publish-apartment-step2',
  templateUrl: './publish-apartment-step2.component.html',
  styleUrls: ['./publish-apartment-step2.component.scss']
})
export class PublishApartmentStep2Component implements OnInit,OnDestroy{
  label="כתובת הנכס"
  @Input() apartmentTypes!:string[]
  apartmentCondition:string[]=Object.values(Condition).filter(c=>typeof c==='string') as string[]
  step2Form!:FormGroup
  summary:string=""
  apartmentViews=apartmentViews
  cities:string[]=[]
  streets:string[]=[]
  regexForPositiveInteger=/^[1-9]\d*$/
  isSubmitted:boolean=false
  constructor(private fb:FormBuilder,private publishService:PublishApartmentService){}
  ngOnInit(): void {
    this.step2Form=this.fb.group({
      type:['',Validators.required],
      condition:['',Validators.required],
      amountOfAirDirection:[1,[
        Validators.required
      ]],
      view:[this.apartmentViews[0],[
        Validators.required
      ]],
      isRearAsset:[false,[
        Validators.required
      ]],
      city:['',[
        Validators.required
      ]],
      street:['',[
        Validators.required
      ]],
      streetNumber:['',[
        Validators.required,
        Validators.pattern(this.regexForPositiveInteger)
      ]],
      floor:['',[
        Validators.required,
        Validators.pattern(this.regexForPositiveInteger)
      ]],
      amountOfFloorsInBuilding:['',[
        Validators.required,
        Validators.pattern(this.regexForPositiveInteger)
      ]],
      isOnPoles:[false,[
        Validators.required
      ]],
      apartmentNumber:['',[
        Validators.required,
        Validators.pattern(this.regexForPositiveInteger)
      ]]
    })
  }
  getControl(name:string){
    return this.step2Form.get(name) as FormControl
  }
  setInputValue(value:string,controlName:string){
    this.getControl(controlName).setValue(value)
  }
  changeCheckbox(controlName:string){
    const control=this.getControl(controlName)
    control.setValue(!control.value)
  }
  onSubmit(){
    this.cli()
    console.log("ertew",this.step2Form.getRawValue())
    if (this.step2Form.invalid){
      this.isSubmitted=true
      return 
    }
  }
  showError(controlName:string){
    return this.isSubmitted&&this.getControl(controlName).invalid
  }
  cli(){
    this.publishService.getCities()
  }
  ngOnDestroy(): void {
    
  }
}
