import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  //by default set to be false
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  //method to show progress-spinner
  show(){
    this.loadingSubject.next(true);
  }

  //method to hide progress-spinner
  hide(){
    this.loadingSubject.next(false);
  }

  constructor() { }
}
