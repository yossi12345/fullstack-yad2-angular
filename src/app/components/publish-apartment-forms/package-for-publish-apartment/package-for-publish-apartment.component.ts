import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-package-for-publish-apartment',
  templateUrl: './package-for-publish-apartment.component.html',
  styleUrls: ['./package-for-publish-apartment.component.scss']
})
export class PackageForPublishApartmentComponent {
  @Input() adType!:string
  @Input() iconSrc!:string
  @Input() choosed!:boolean
  @Output() onChoose=new EventEmitter()
  onClick(){
    this.onChoose.emit()
  }
}
