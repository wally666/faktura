import { Component, OnInit } from '@angular/core';

import { DataService } from './../data.service'
import * as Models from './../models'

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {

  public units: Array<Models.Unit>;

  constructor(private dataService: DataService) { 
    this.dataService.getUnits().then(response => this.units = response);
  }

  ngOnInit() {
  }
}