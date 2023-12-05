import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PublishApartmentService } from 'src/app/services/publish-apartment.service';

@Component({
  selector: 'app-publish-apartment-step4',
  templateUrl: './publish-apartment-step4.component.html',
  styleUrls: ['./publish-apartment-step4.component.scss']
})
export class PublishApartmentStep4Component implements OnInit{
  summary=""
  step4Form!:FormGroup
  today=new Date().toISOString().split('T')[0]
  isSubmitted:boolean=false
  showEntryDateError:boolean=false
  constructor(private fb:FormBuilder,private publishService:PublishApartmentService){}
  ngOnInit(): void {
    const data:any=this.publishService.getStepData(4)
    this.step4Form=this.fb.group({
      area:[data?.area??'',[
        Validators.required,
        Validators.pattern(/^[1-9]\d*(\.\d+)?$/)
      ]],
      builtArea:[data?.builtArea??'',[
        Validators.pattern(/^[1-9]\d*(\.\d+)?$/)
      ]],
      price:[data?.price??'',[
        Validators.required,
        Validators.min(100),
        Validators.pattern(/^[1-9]\d*$/)
      ]],
      entryDate:['',[
        Validators.required,
      ]],
      isEntryDateFlexible:[false],
      isEntryDateImmidiate:[false],
      pricePerMeter:[{value:'',disabled:true}]
    })
    if (data&&data.isEntryDateFlexible!==null){
      this.getControl('isEntryDateFlexible').setValue(data.isEntryDateFlexible)
      this.getControl('isEntryDateImmidiate').setValue(!data.isEntryDateFlexible)
      this.getControl('entryDate').disable()
    }
    if (data?.entryDate)
      this.getControl('entryDate').setValue(new Date(data.entryDate).toISOString().split('T')[0])

    this.updatePricePerMeter()
  }
  handleChangeCheckbox(inputName:"isEntryDateFlexible"|'isEntryDateImmidiate'){
    const entryDateControl=this.getControl('entryDate')
    const isEntryDateImmidiateControl=this.getControl('isEntryDateImmidiate')
    const isEntryDateFlexibleControl=this.getControl('isEntryDateFlexible')
    console.log("&&")
    if (inputName==='isEntryDateFlexible'&&!isEntryDateFlexibleControl.value){
      isEntryDateFlexibleControl.setValue(true)
      isEntryDateImmidiateControl.setValue(false)
      entryDateControl.disable()
      if (entryDateControl.value==="")
        entryDateControl.setValue(this.today)
    }
    else if (inputName==='isEntryDateImmidiate'&&!isEntryDateImmidiateControl.value){
      isEntryDateFlexibleControl.setValue(false)
      isEntryDateImmidiateControl.setValue(true)
      entryDateControl.disable()
      if (entryDateControl.value==='')
        entryDateControl.setValue(this.today)
    }
    else{
      entryDateControl.enable()
      if (inputName==='isEntryDateFlexible')
        isEntryDateFlexibleControl.setValue(false)
      else
        isEntryDateImmidiateControl.setValue(false)  
    }
  }
  updatePricePerMeter(){
    const controlPrice=this.getControl('price')
    const controlArea=this.getControl("area")
    const newValue=(controlArea.valid&&controlPrice.valid)?((controlPrice.value/controlArea.value).toLocaleString()):''
    this.getControl('pricePerMeter').setValue(newValue)
  }
  getControl(controlName:string){
    return this.step4Form.get(controlName) as FormControl
  }
  onSubmit(){
    if (this.step4Form.status==='INVALID'){
      this.isSubmitted=true
      return 
    }
    const data:any={}
    this.showEntryDateError=false
    data.entryDate=this.getControl('entryDate').value
    if (data.entryDate<new Date(this.today)){
      this.showEntryDateError=true
      return 
    }
    data.area=this.getControl('area').value*1
    data.builtArea=this.getControl('builtArea').value*1
    data.price=this.getControl('price').value*1
    const isEntryDateFlexible=this.getControl('isEntryDateFlexible').value
    const isEntryDateImmidiate=this.getControl('isEntryDateImmidiate').value
    if (isEntryDateFlexible||isEntryDateImmidiate)
      data.isEntryDateFlexible=isEntryDateFlexible?isEntryDateFlexible:isEntryDateImmidiate
    this.summary="מחיר: "+data.price+'₪'
    this.publishService.onSubmitStep(4,data)
  }
}
