import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-sign-up-part3-page',
  templateUrl: './sign-up-part3-page.component.html',
  styleUrls: ['./sign-up-part3-page.component.scss']
})
export class SignUpPart3PageComponent implements OnInit{
  showPhoneError:boolean=false
  showFirstNameError:boolean=false
  showLastNameError:boolean=false
  showTermsError:boolean=false
  signUpPart3!:FormGroup
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.signUpPart3=this.fb.group({
      firstName:['',[
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[^0-9!@#$%^&*()]*$/)
      ]],
      lastName:['',[
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[^0-9!@#$%^&*()]*$/)
      ]],
      phone:['',[
        Validators.required,
        Validators.pattern(/^(050|052|053|054|057|058)-\d{7}$/)
      ]],
      terms:[,[
        Validators.requiredTrue
      ]],
      mailing:[,[]]
    })
  }
  getControl(name:"firstName"|"lastName"|"phone"|"terms"|"mailing"){
    return this.signUpPart3.get(name) as FormControl
  }
  getFirstNameError(){
    const control=this.getControl("firstName")
    if (control.hasError("required"))
      return "נבקש למלא את השם"
    if (control.hasError("minLength"))
      return "שם עם אות אחת? זה שיא גינס"
    if (control.hasError("pattern"))
      return "שם עם ספרה? יש לנו עסק עם רובוט?"
    return ""
  }
  getLastNameError(){
    const control=this.getControl("lastName")
    if (control.hasError("required"))
      return "נבקש למלא את שם המשפחה"
    if (control.hasError("minLength"))
      return "שם משפחה עם אות אחת? זה שיא גינס"
    if (control.hasError("pattern"))
      return "שם עם ספרה? יש לנו עסק עם רובוט?"
    return ""
  }
  getPhoneError(){
    const control=this.getControl("phone")
    if (control.hasError("required"))
      return "היי, לא לשכוח למלא מספר טלפון"
    if (control.hasError("pattern"))
      return "נבקש את מספר הנייד שלך"
    return ""
  }
  clearInput(name:"firstName"|"lastName"){
    this.getControl(name).setValue("")
  }
  onChange(name:"firstName"|"lastName"){
    switch(name){
      case "firstName":
        this.showFirstNameError=false
        break
      case "lastName":
        this.showLastNameError=false
        break
    }
  }
  onPhoneInputChange(){
    this.showPhoneError=false
    const control=this.getControl("phone")
    if (/^(?=\d{3}$)[0-9]*$/.test(control.value))
      control.setValue(control.value+"-")
    
  }
  changeCheckbox(name:"mailing"|"terms"){
    const control=this.getControl(name)
    control.setValue(!control.value)
    if (name==="terms")
      this.showTermsError=false
  }
  handleSubmit(){
    if (this.signUpPart3.invalid){
      this.showPhoneError=true
      this.showFirstNameError=true
      this.showLastNameError=true
      this.showTermsError=this.getControl('terms').invalid
      console.log(this.getControl('terms'))
      return 
    }
    const password=sessionStorage.getItem("password")
    const mail=sessionStorage.getItem("mail")
    if (!mail||!password){
      this.router.navigate(['sign-up1'])
      alert("משהו השתבש נתחיל מהתחלה")
      return 
    }
    this.authService.signUp({
      phone:this.getControl("phone").value,
      firstName:this.getControl("firstName").value,
      lastName:this.getControl("lastName").value,
      mail,password
    }).pipe(first()).subscribe((res)=>{
      if (res)
        this.router.navigate(['/'],{replaceUrl:true})
    })
  }
}
