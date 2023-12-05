import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPart1PageComponent } from './components/pages/sign-up-part1-page/sign-up-part1-page.component';
import { SignUpPart2PageComponent } from './components/pages/sign-up-part2-page/sign-up-part2-page.component';
import { SignUpPart3PageComponent } from './components/pages/sign-up-part3-page/sign-up-part3-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { SignInPageComponent } from './components/pages/sign-in-page/sign-in-page.component';
import { isUserInSignUpProcessGuard } from './guards/is-user-in-sign-up-process.guard';
import { FavoritesPageComponent } from './components/pages/favorites-page/favorites-page.component';
import { PersonalZonePageComponent } from './components/pages/personal-zone-page/personal-zone-page.component';
import { PublishPageComponent } from './components/pages/publish-page/publish-page.component';
import { PublishApartmentPageComponent } from './components/pages/publish-apartment-page/publish-apartment-page.component';
import { getApartmentTypesResolver } from './resolvers/get-apartment-types.resolver';
import { getApartmentFeaturesResolver } from './resolvers/get-apartment-features.resolver';
import { SearchApartmentPageComponent } from './components/pages/search-apartment-page/search-apartment-page.component';
import { searchApartmentsResolver } from './resolvers/search-apartments.resolver';

const routes: Routes = [
  {path:'',component:HomePageComponent,pathMatch:'full'},
  {path:"sign-up1",component:SignUpPart1PageComponent},
  {path:'sign-up2',component:SignUpPart2PageComponent,//canActivate:[isUserInSignUpProcessGuard]
},
  {path:'sign-up3',component:SignUpPart3PageComponent,//canActivate:[isUserInSignUpProcessGuard]
},
  {path:'sign-in',component:SignInPageComponent},
  {path:'favorites',component:FavoritesPageComponent},
  {path:'personal-zone',component:PersonalZonePageComponent},
  {path:'publish',component:PublishPageComponent},
  {path:'publish-apartment',component:PublishApartmentPageComponent,
    resolve:{
      types:getApartmentTypesResolver,
      features:getApartmentFeaturesResolver
    }
  },
  {path:'search-apartment',component:SearchApartmentPageComponent,
    resolve:{
      types:getApartmentTypesResolver,
      features:getApartmentFeaturesResolver,
      searchApartments:searchApartmentsResolver
    }
  },
  {path:"**",redirectTo:"sign-in"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
