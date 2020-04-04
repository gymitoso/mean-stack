import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit {
  version: string = require( '../../../../../package.json').version;

  constructor() { }

  ngOnInit() { }
}
