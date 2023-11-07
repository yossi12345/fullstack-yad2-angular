import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogFormWrapperComponent } from './components/log-form-wrapper/log-form-wrapper.component';
import { SignUpPart1PageComponent } from './components/pages/sign-up-part1-page/sign-up-part1-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EyeIconForPaswordInputComponent } from './components/eye-icon-for-pasword-input/eye-icon-for-pasword-input.component';
import { SignUpPart2PageComponent } from './components/pages/sign-up-part2-page/sign-up-part2-page.component';
import { FormsModule } from '@angular/forms';
import { SignUpPart3PageComponent } from './components/pages/sign-up-part3-page/sign-up-part3-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { SignInPageComponent } from './components/pages/sign-in-page/sign-in-page.component';
@NgModule({
  declarations: [
    AppComponent,
    LogFormWrapperComponent,
    SignUpPart1PageComponent,
    EyeIconForPaswordInputComponent,
    SignUpPart2PageComponent,
    SignUpPart3PageComponent,
    HomePageComponent,
    SignInPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
