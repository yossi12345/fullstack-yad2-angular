import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PHONE_NUMBER_REGEX } from 'src/app/constants';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PublishApartmentService } from 'src/app/services/publish-apartment.service';

@Component({
  selector: 'app-publish-apartment-step6',
  templateUrl: './publish-apartment-step6.component.html',
  styleUrls: ['./publish-apartment-step6.component.scss']
})
export class PublishApartmentStep6Component implements OnInit,OnDestroy{
  summary:string=""
  subscriber!:Subscription
  user!:User|null
  step6Form!:FormGroup
  amountOfPhoneNumbers:1|2=1
  isSubmitted:boolean=false
  constructor(private publishService:PublishApartmentService,private authService:AuthService,private fb:FormBuilder){}
  ngOnInit(): void {
    this.authService.user$.subscribe(user=>{
      this.user=user==="pending"?null:user
    })
    const data:any=this.publishService.getStepData(6)
    this.step6Form=this.fb.group({
      name1:['',[
        Validators.required,
        Validators.pattern(/^[\u0590-\u05FF\s-]*$/)
      ]],
      phone1:['',[
        Validators.required,
        Validators.pattern(PHONE_NUMBER_REGEX)
      ]],
      phone2:['',[
        Validators.pattern(PHONE_NUMBER_REGEX),
        this.validateSecondPhone()
      ]],
      name2:['',[
        Validators.pattern(/^[\u0590-\u05FF\s-]*$/),
        this.validateSecondPhone()
      ]],
      terms:[false,[
        Validators.requiredTrue
      ]]
    })
    if (!data&&!this.user) return 

    const name1Control=this.getControl('name1')
    const phone1Control=this.getControl('phone1')
    if (!data&&this.user){
      name1Control.setValue(this.user.firstName)
      phone1Control.setValue(this.user.phone)
      return 
    }
    name1Control.setValue(data.phones[0].name)
    phone1Control.setValue(data.phones[0].phone)
    this.getControl('terms').setValue(true)
    if (data.phones.lengt>1) {
      this.getControl('name2').setValue(data.phones[1].name)
      this.getControl('phone2').setValue(data.phones[1].phone)
      this.amountOfPhoneNumbers=2
    }
  }
  validateSecondPhone(){
    return (control:AbstractControl)=>(
      (control.value===""&&this.amountOfPhoneNumbers===2)?{required:true}:null
    )
  }
  getControl(controlName:string){
    return this.step6Form.get(controlName) as FormControl
  }
  changeTermsCheckbox(){
    const control=this.getControl('terms')
    control.setValue(!control.value)
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
  handleChangeAmountOfPhoneNumbers(){
    this.amountOfPhoneNumbers=this.amountOfPhoneNumbers===1?2:1
    if (this.amountOfPhoneNumbers===1){
      this.getControl('name2').setValue('')
      this.getControl('phone2').setValue('')
    }
  }
  onPhoneInputChange(controlName:'phone1'|'phone2'){
    const control=this.getControl(controlName)
    if (/^(?=\d{3}$)[0-9]*$/.test(control.value))
      control.setValue(control.value+"-")
  }
  onNameInputChange(controlName:'name1'|'name2'){
    const control=this.getControl(controlName)
    const allowedValue=control.value.replace(/[^\u0590-\u05FF\s-]/g, '')
    console.log("H",allowedValue)
    control.setValue(allowedValue)
  }
  onSubmit(){
    if (this.step6Form.invalid){
      this.isSubmitted=true
      return 
    }
    const data=this.step6Form.getRawValue()
    const dataForSending={
      phones:[
        {
          phone:data.phone1,
          name:data.name1
        }
      ]
    }
    if (this.amountOfPhoneNumbers===2){
      dataForSending.phones.push({
        phone:data.phone2,
        name:data.name2
      })
    }
    this.publishService.onSubmitStep(6,dataForSending)
    
  }
}
