import { Component } from '@angular/core';
import { PublishApartmentService } from 'src/app/services/publish-apartment.service';

@Component({
  selector: 'app-publish-apartment-step1',
  templateUrl: './publish-apartment-step1.component.html',
  styleUrls: ['./publish-apartment-step1.component.scss']
})
export class PublishApartmentStep1Component {
  label:string="אני רוצה למכור נכס"
  constructor(private publishService:PublishApartmentService){}
  
  onChoose(sellingType:string){
    this.publishService.onSubmitStep(1,{sellingType})
  }
}
