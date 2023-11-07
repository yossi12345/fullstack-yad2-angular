import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPart1PageComponent } from './components/pages/sign-up-part1-page/sign-up-part1-page.component';
import { SignUpPart2PageComponent } from './components/pages/sign-up-part2-page/sign-up-part2-page.component';
import { SignUpPart3PageComponent } from './components/pages/sign-up-part3-page/sign-up-part3-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { SignInPageComponent } from './components/pages/sign-in-page/sign-in-page.component';

const routes: Routes = [
  {path:'',component:HomePageComponent,pathMatch:'full'},
  {path:"sign-up1",component:SignUpPart1PageComponent},
  {path:'sign-up2',component:SignUpPart2PageComponent},
  {path:'sign-up3',component:SignUpPart3PageComponent},
  {path:'sign-in',component:SignInPageComponent},
  {path:"**",redirectTo:"sign-up1"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
