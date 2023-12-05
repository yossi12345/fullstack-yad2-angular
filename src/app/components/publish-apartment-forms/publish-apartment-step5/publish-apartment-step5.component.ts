import { Component } from '@angular/core';
import { PublishApartmentService } from 'src/app/services/publish-apartment.service';

@Component({
  selector: 'app-publish-apartment-step5',
  templateUrl: './publish-apartment-step5.component.html',
  styleUrls: ['./publish-apartment-step5.component.scss']
})
export class PublishApartmentStep5Component{
  summary:string=""
  video?:{src:string,file:File}
  images:{src:string,file:File}[]=[]
  constructor(private publishService:PublishApartmentService){}
  onChange(event:Event){
    const filesArray=(event.target as HTMLInputElement).files
    if (!filesArray) return 
    const file=filesArray[0]
    const extname=file.name.slice(file.name.lastIndexOf(".")+1).toLowerCase()
    switch(extname){
      case 'avi':
      case 'mp4':
        this.video={
          src:URL.createObjectURL(file),
          file
        }
        break
      case "jpeg":
      case "jpg":
      case "png":
        if (this.images.length>=10) return 
        this.images.push({
          src:URL.createObjectURL(file),
          file
        })
        break
      default:
        (event.target as HTMLInputElement).value=""
    }
  }
  eraseFile(index?:number){
    if (index===undefined)
      this.video=undefined
    else
      this.images.splice(index,1)
  }
  onSubmit(){
    const data:any={}
    data.mainFile=this.images[0]?.file
    data.video=this.video?.file
    data.files=[]
    for (let i=1;i<this.images.length;i++)
      data.files.push(this.images[i].file)
    this.publishService.onSubmitStep(5,data)
  }
}
