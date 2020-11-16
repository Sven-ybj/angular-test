import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { MyValidators } from '../../MyValidators'
import cityData from '../../cityData'

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class TestComponent implements OnInit,OnDestroy {
  cityOptions: any[] | null = null;

  constructor(private router: Router) {}

  ngOnDestroy() { 
    console.log(`onDestroy`); 
  }

  ngOnInit() {
    console.log(`ngOnInit`);
    setTimeout(() => {
      this.cityOptions = cityData;
    }, 100);

    // 内存泄漏解决不了 
    // https://github.com/angular/angular/issues/20007
    // https://github.com/angular/angular/issues/37952
  }

}
