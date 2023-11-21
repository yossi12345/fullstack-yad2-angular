import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yad2-angular';
  onChangeTemp(event:Event){
    const filesArray=(event.target as HTMLInputElement).files
    if (!filesArray) return 
    const file=filesArray[0]
    
  }
}
