import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { APARTMENT_CONDITIONS, APARTMENT_VIEWS, getKeyByValue } from 'src/app/Dictionaries';
import { PublishApartmentService } from 'src/app/services/publish-apartment.service';
import { SearchPlacesService } from 'src/app/services/search-places.service';

@Component({
  selector: 'app-publish-apartment-step2',
  templateUrl: './publish-apartment-step2.component.html',
  styleUrls: ['./publish-apartment-step2.component.scss'],
  providers:[SearchPlacesService]
})
export class PublishApartmentStep2Component implements OnInit{
  @Input() apartmentTypes:string[]=[]
  apartmentConditions:string[]=Object.keys(APARTMENT_CONDITIONS)
  step2Form!:FormGroup
  summary:string=""
  apartmentViews:string[]=Object.keys(APARTMENT_VIEWS)
  cities:string[]=[]
  streets:string[]=[]
  regexForPositiveInteger=/^[0-9]\d*$/
  isSubmitted:boolean=false
  showStreetError:boolean=false
  showCityError:boolean=false
  constructor(private fb:FormBuilder,private publishService:PublishApartmentService,private searchPlaces:SearchPlacesService){}
  ngOnInit(): void {
    const data:any=this.publishService.getStepData(2)
    this.step2Form=this.fb.group({
      type:[data?.type??'',Validators.required],
      condition:[data?getKeyByValue(APARTMENT_CONDITIONS,data.condition):'',Validators.required],
      amountOfAirDirection:[data?.amountOfAirDirection??1,[
        Validators.required
      ]],
      view:[data?getKeyByValue(APARTMENT_VIEWS,data.view):this.apartmentViews[0],[
        Validators.required
      ]],
      isRearAsset:[data?.isRearAsset??false,[
        Validators.required
      ]],
      city:[data?.city??'',[
        Validators.required,
        Validators.pattern(/^[\u05D0-\u05EA\s\-\'\(\)]+$/)
      ],],
      street:[data?.street??'',[
        Validators.required,
        Validators.pattern(/^[\u05D0-\u05EA\s\-\'\(\)]+$/)
      ]],
      streetNumber:[data?.streetNumber??'',[
        Validators.required,
        Validators.pattern(this.regexForPositiveInteger)
      ]],
      floor:[data?.floor??'',[
        Validators.required,
        Validators.pattern(this.regexForPositiveInteger)
      ]],
      amountOfFloorsInBuilding:[data?.amountOfFloorsInBuilding??'',[
        Validators.required,
        Validators.pattern(this.regexForPositiveInteger)
      ]],
      isOnPoles:[data?.isOnPoles??false,[
        Validators.required
      ]],
      apartmentNumber:[data?.apartmentNumber??'',[
        Validators.required,
        Validators.pattern(this.regexForPositiveInteger)
      ]]
    })
    this.updateSummary(this.step2Form.getRawValue())
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
    if (this.step2Form.invalid){
      this.isSubmitted=true
      return 
    }
    
    const formData=this.step2Form.getRawValue()
    forkJoin({cities:this.searchPlaces.getCities(formData.city),streets:this.searchPlaces.getStreets(formData.street)})
      .subscribe((res:any)=>{
        console.log(res)
        if (res.streets[0]===formData.street&&res.cities[0]===formData.city){
          this.updateSummary(formData)
          formData.view=APARTMENT_VIEWS[formData.view]
          formData.condition=APARTMENT_CONDITIONS[formData.condition]
          formData.amountOfFloorsInBuilding*=1
          formData.streetNumber*=1
          formData.apartmentNumber*=1
          formData.floor*=1
          this.publishService.onSubmitStep(2,formData)
        }
        else{
          this.showCityError=res.cities[0]===formData.city
          this.showStreetError=res.streets[0]===formData.street
        }
      })
  }
  updateSummary({city,type,street,streetNumber,floor}:any){
    this.summary=type+" - "+city+" - "+street+" - "+streetNumber+" - קומה "+floor
  }
  showError(controlName:string){
    return this.isSubmitted&&this.getControl(controlName).invalid
  }
  getCities(){
    const search=this.getControl("city").value
    this.searchPlaces.getCities(search).subscribe((cities)=>{
      this.cities=cities
    })
  }
  getStreets(){
    const search=this.getControl("street").value
    this.searchPlaces.getStreets(search).subscribe((streets)=>{
      this.streets=streets
    })
  }
}
