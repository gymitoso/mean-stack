import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: [
      './loading.component.scss'
  ]
})
export class LoadingComponent {
  @Input() isSpinnerVisible = true;
  @Input() isLoadingVisible = false;

  constructor() {
  }
}
