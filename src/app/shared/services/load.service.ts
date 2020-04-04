import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadService {
  private isLoadingSource = new BehaviorSubject<boolean>(false);

  isLoading$ = this.isLoadingSource.asObservable();

  constructor() {}

  getIsLoading(): boolean {
    return this.isLoadingSource.getValue();
  }

  emitLoadEvent(isLoading: boolean) {
    this.isLoadingSource.next(isLoading);
  }
}
