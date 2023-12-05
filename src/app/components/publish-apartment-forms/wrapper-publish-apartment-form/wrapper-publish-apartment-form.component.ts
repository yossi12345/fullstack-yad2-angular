import { Component, EventEmitter,Input ,OnDestroy,OnInit,Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { PublishApartmentService } from 'src/app/services/publish-apartment.service';
@Component({
  selector: 'app-wrapper-publish-apartment-form',
  templateUrl: './wrapper-publish-apartment-form.component.html',
  styleUrls: ['./wrapper-publish-apartment-form.component.scss']
})
export class WrapperPublishApartmentFormComponent implements OnInit,OnDestroy{
  @Input() label!:string
  @Input() summary!:string
  @Input() step!:number
  isLastStep!:boolean
  isDisable!:boolean
  isOpen!:boolean
  subscriber!:Subscription
  @Output() onSubmit=new EventEmitter()
  constructor(private publishService:PublishApartmentService){}
  ngOnInit(): void {
    this.isLastStep=this.step===this.publishService.getAmountOfSteps()
    this.subscriber=this.publishService.stepOpenIndex$.subscribe((index)=>{
      this.isOpen=index===this.step
      this.isDisable=index<this.step
    })
  } 
  nextStep(){
    this.onSubmit.emit()
  }
  backStep(){
    if (this.step!==1)
      this.publishService.navigateToSpecificStep(this.step-1)
  }
  openStep(){
    if (!this.isDisable&&!this.isOpen)
      this.publishService.navigateToSpecificStep(this.step)
  }
  stopPropagation(event:Event){
    event.stopPropagation()
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
}
