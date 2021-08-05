import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable()
export class AuthService {
  constructor(
    private https: HttpClient
  ){}

  // baseURL:string = "http://localhost:3000/api/v1"
  baseURL:string = "http://rengo-dev-elb-1974268909.eu-west-3.elb.amazonaws.com/api/v1"

  isemailexit_url:any = this.baseURL+"/users/exists/email";

  isemailexit(value:any): Observable<any> {
    return this.https.get(`${this.isemailexit_url}/${value}`)
  }

  health(): Observable<any> {
    return this.https.get(`${this.baseURL}`)
  }

  signup(body:any): Observable<any> {
    return this.https.post(`${this.baseURL}/users/signup`,body)
  }

  login(value:any,pass:any): Observable<any> {
    return this.https.get(`${this.baseURL}/users/login/${value}/${pass}`)
  }

  info(header:any): Observable<any> {
    return this.https.get(`${this.baseURL}/users/info/`,{'headers':header})
  }

  get_property_type(header:any): Observable<any> {
    return this.https.get(`${this.baseURL}/property-type/`,{'headers':header})
  }

  get_property(header:any): Observable<any> {
    return this.https.get(`${this.baseURL}/property/`,{'headers':header})
  }

  post_property(body:any,header:any): Observable<any> {
    return this.https.post(`${this.baseURL}/property/`,body,{'headers':header})
  }

  postUnit(body:any,header:any): Observable<any> {
    return this.https.post(`${this.baseURL}/unit/`,body,{'headers':header})
  }
  getUnit(value:any,header:any): Observable<any> {
    return this.https.get(`${this.baseURL}/unit/${value}`,{'headers':header})
  }

  getRentType(header:any): Observable<any> {
    return this.https.get(`${this.baseURL}/rent-type`,{'headers':header})
  }
  postRentType(body:any,header:any): Observable<any> {
    return this.https.post(`${this.baseURL}/rent-type`,body,{'headers':header})
  }

  getRent(value:any,header:any): Observable<any> {
    return this.https.get(`${this.baseURL}/rent/${value}`,{'headers':header})
  }
  postRent(body:any,header:any): Observable<any> {
    return this.https.post(`${this.baseURL}/rent`,body,{'headers':header})
  }

  isTenantEmailExit(value:any,header:any): Observable<any> {
    return this.https.get(`${this.baseURL}/tenant/email/${value}`,{'headers':header})
  }

  getTenant(value:any,header:any): Observable<any> {
    return this.https.get(`${this.baseURL}/tenant/unit/${value}`,{'headers':header})
  }

  postTenant(body:any,header:any): Observable<any> {
    return this.https.post(`${this.baseURL}/tenant/`,body,{'headers':header})
  }

  uploadDoc(body:any,header:any):Observable<any>{
    return this.https.post(`${this.baseURL}/document/`,body,{'headers':header})
  }


}
