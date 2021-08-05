
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class SharedService {

  private email_address = new BehaviorSubject('em');
  sharedMessage = this.email_address.asObservable();
  constructor() {}

  nextEmailId(value: string) {
    this.email_address.next(value)
  }

  public firstname = new BehaviorSubject('');
  public lastname = new BehaviorSubject('');
  public propertyEditIndex = new BehaviorSubject(-1);
}
