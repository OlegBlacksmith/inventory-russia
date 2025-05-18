import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareerModalService {

  constructor() { }

  private dialogVisible$ = new BehaviorSubject<boolean>(false);

  show() {
    this.dialogVisible$.next(true);

  }

  hide() {
    this.dialogVisible$.next(false);
  }

  get visibility$() {
    return this.dialogVisible$.asObservable();
  }
}
