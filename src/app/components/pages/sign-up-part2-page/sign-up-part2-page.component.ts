import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-sign-up-part2-page',
  templateUrl: './sign-up-part2-page.component.html',
  styleUrls: ['./sign-up-part2-page.component.scss']
})
export class SignUpPart2PageComponent implements OnInit,OnDestroy{
  inputValue:string|null=""
  showError:boolean=false
  inputClasses={
    ["clear-input"]:true,
    ["error-input"]:this.showError
  }
  countForSendCode:number=60
  showSendCodeAgainBtn:boolean=false
  subscriber!:Subscription
  constructor(private router:Router){}
  ngOnInit(): void {
    this.subscriber=interval(1000).subscribe(()=>{
      if (this.countForSendCode==0)
        return
      this.countForSendCode--
      if (this.countForSendCode===0)
        this.showSendCodeAgainBtn=true
    })
  }
  sendCodeAgain(){
    //send code again
    this.countForSendCode=60
    this.showSendCodeAgainBtn=false
    console.log(this.inputValue)
  }
  onSubmit(event:SubmitEvent){
    event.preventDefault()
    if (this.inputValue!=="123456"){
      this.showError=true
      this.inputClasses['error-input']=true
    }
    else
      this.router.navigate(['sign-up3'])
  }
  onChange(event:Event){
    const input= (event.target as HTMLInputElement)
    const allowedValue=input.value.replace(/[^0-9]/g, '')
    if (input.value===allowedValue){
      this.showError=false
      this.inputClasses['error-input']=false
    }
    this.inputValue=allowedValue
    input.value=allowedValue
  }
  clearInput(){
    console.log("h")
    this.inputValue=null
    this.showError=false
    this.inputClasses['error-input']=false
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
}
