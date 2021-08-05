import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {WelcomeComponent} from "./welcome_screen/welcome.component";
import {LoginComponent} from "./login/login.component";
import {OwnerdashboardComponent} from "./dashboard/ownerdashboard.component";
import {PropertyComponent} from "./property/property.component";
import {AddpropertyComponent} from "./property/addproperty/addproperty.component";
import {ProfileupdateComponent} from "./profile_update/profileupdate.component";
import {TenantComponent} from "./tenant/tenant.component";
import {GetPropertyComponent} from "./property/propertylist/getproperty.component";
import {EditPropertyComponent} from "./property/editproperty/editproperty.component";
import {TenantDetailsComponent} from "./tenant/tenantdetails/tenantdetails.component";
import {TenantEditComponent} from "./tenant/tenantedit/tenantedit.component";
import {TenantListComponent} from "./tenant/tenantlist/tenantlist.component";

const routes: Routes = [
  { path: 'login', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login/password', component: LoginComponent },
  { path: 'dashboard/owner', component: OwnerdashboardComponent },
  { path: 'property', component: PropertyComponent },
  { path: 'property/add', component: AddpropertyComponent },
  { path: 'property/edit', component: EditPropertyComponent },
  { path: 'property/list', component: GetPropertyComponent },
  { path: 'profile_update', component: ProfileupdateComponent },
  { path: 'tenant/add', component: TenantComponent },
  { path: 'tenant/details', component: TenantDetailsComponent },
  { path: 'tenant/edit', component: TenantEditComponent },
  { path: 'tenant/list', component: TenantListComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
