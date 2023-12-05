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
import { OtherWaysToSignComponent } from './components/other-ways-to-sign/other-ways-to-sign.component';
import { PasswordTooltipComponent } from './components/password-tooltip/password-tooltip.component';
import { IconComponent } from './components/icon/icon.component';
import { WrapperComponent } from './components/side-menu/wrapper/wrapper.component';
import { UserOptions1Component } from './components/side-menu/user-options1/user-options1.component';
import { ItemForSelling1Component } from './components/side-menu/item-for-selling1/item-for-selling1.component';
import { SideMenu1Component } from './components/side-menu/side-menu1/side-menu1.component';
import { UserDropHeaderComponent } from './components/user-drop-header/user-drop-header.component';
import { FavoriteAdDropHeaderComponent } from './components/favorite-ad-drop-header/favorite-ad-drop-header.component';
import { ItemsForSellingDropsHeaderComponent } from './components/items-for-selling-drops-header/items-for-selling-drops-header.component';
import { AdsBannerComponent } from './components/ads-banner/ads-banner.component';

import { FavoritesPageComponent } from './components/pages/favorites-page/favorites-page.component';
import { PersonalZonePageComponent } from './components/pages/personal-zone-page/personal-zone-page.component';
import { PublishPageComponent } from './components/pages/publish-page/publish-page.component';
import { WrapperPublishApartmentFormComponent } from './components/publish-apartment-forms/wrapper-publish-apartment-form/wrapper-publish-apartment-form.component';
import { PublishApartmentStep1Component } from './components/publish-apartment-forms/publish-apartment-step1/publish-apartment-step1.component';
import { PublishApartmentStep2Component } from './components/publish-apartment-forms/publish-apartment-step2/publish-apartment-step2.component';
import { PublishApartmentStep3Component } from './components/publish-apartment-forms/publish-apartment-step3/publish-apartment-step3.component';
import { PublishApartmentStep4Component } from './components/publish-apartment-forms/publish-apartment-step4/publish-apartment-step4.component';
import { PublishApartmentStep5Component } from './components/publish-apartment-forms/publish-apartment-step5/publish-apartment-step5.component';
import { PublishApartmentStep6Component } from './components/publish-apartment-forms/publish-apartment-step6/publish-apartment-step6.component';
import { PublishApartmentStep7Component } from './components/publish-apartment-forms/publish-apartment-step7/publish-apartment-step7.component';
import { PublishApartmentPageComponent } from './components/pages/publish-apartment-page/publish-apartment-page.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { PackageForPublishApartmentComponent } from './components/publish-apartment-forms/package-for-publish-apartment/package-for-publish-apartment.component';
import { SearchApartmentPageComponent } from './components/pages/search-apartment-page/search-apartment-page.component';
import { SearchApartmentFormComponent } from './components/search-apartment-form/search-apartment-form.component';
import { InputWithDropComponent } from './components/input-with-drop/input-with-drop.component';
import { ApartmentTypesInputForSearchFormComponent } from './components/apartment-types-input-for-search-form/apartment-types-input-for-search-form.component';
import { ApartmentForSearchPageComponent } from './components/apartment-for-search-page/apartment-for-search-page.component';
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
    OtherWaysToSignComponent,
    PasswordTooltipComponent,
    IconComponent,
    WrapperComponent,
    UserOptions1Component,
    ItemForSelling1Component,
    SideMenu1Component,
    UserDropHeaderComponent,
    FavoriteAdDropHeaderComponent,
    ItemsForSellingDropsHeaderComponent,
    AdsBannerComponent,
    
    FavoritesPageComponent,
    PersonalZonePageComponent,
    PublishPageComponent,
    WrapperPublishApartmentFormComponent,
    PublishApartmentStep1Component,
    PublishApartmentStep2Component,
    PublishApartmentStep3Component,
    PublishApartmentStep4Component,
    PublishApartmentStep5Component,
    PublishApartmentStep6Component,
    PublishApartmentStep7Component,
    PublishApartmentPageComponent,
    CheckboxComponent,
    PackageForPublishApartmentComponent,
    SearchApartmentPageComponent,
    SearchApartmentFormComponent,
    InputWithDropComponent,
    ApartmentTypesInputForSearchFormComponent,
    ApartmentForSearchPageComponent,
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
