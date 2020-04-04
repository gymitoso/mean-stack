import { Component, AfterViewInit } from '@angular/core';

import { LoadService } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  constructor(
    private loadService: LoadService,
  ) { }

  ngAfterViewInit() {
    // Close loading after login redirection
    this.loadService.emitLoadEvent(false);
  }

}
