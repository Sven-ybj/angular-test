import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { MyValidators } from '../../MyValidators'
import cityData from '../../cityData'

@Component({
  selector: 'app-test',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.css']
})
export class TestComponent implements OnInit,OnDestroy {
  validateForm!: FormGroup;
  validateForm2!: FormGroup;
  validateForm3!: FormGroup;
  validateForm4!: FormGroup;
  validateForm5!: FormGroup;
  cityOptions: any[] | null = null;

  inputControlArray: Array < { index: number;show: boolean } > = [];
  dateControlArray: Array < { index: number;show: boolean } > = [];
  cityControlArray: Array < { index: number;show: boolean } > = [];
  selectControlArray: Array < { index: number;show: boolean } > = [];
  switchControlArray: Array < { index: number;show: boolean } > = [];

  autoTips: Record < string, Record < string, string >> = {
    'zh-cn': {
      required: '必填项'
    },
    en: {
      required: 'Input is required'
    },
    default: {
      email: '邮箱格式不正确/The input is not valid email'
    }
  };

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnDestroy() { 
    console.log(`onDestroy`); 
  }

  ngOnInit() {
    console.log(`ngOnInit`);
    setTimeout(() => {
      this.cityOptions = cityData;
    }, 100);

    this.validateForm = this.fb.group({});
    this.validateForm2 = this.fb.group({});
    this.validateForm3 = this.fb.group({});
    this.validateForm4 = this.fb.group({});
    this.validateForm5 = this.fb.group({});

    // 内存泄漏解决不了 
    // https://github.com/angular/angular/issues/20007
    // https://github.com/angular/angular/issues/37952
    
    const { required, maxLength, minLength, email, mobile } = MyValidators;
    for (let i = 0; i < 200; i++) {
      this.inputControlArray.push({ index: i, show: true });
      this.validateForm.addControl(`field${i}`, new FormControl((Date.now() + "").substring(10), [Validators.required, maxLength(6)]));
    }
    for (let i = 0; i < 50; i++) {
      this.dateControlArray.push({ index: i, show: true });
      // this.validateForm2.addControl(`field${i}`, new FormControl(new Date(), [Validators.required]));
      this.validateForm2.addControl(`field${i}`, new FormControl(new Date()));
    }
    for (let i = 0; i < 10; i++) {
      this.cityControlArray.push({ index: i, show: true });
      // this.validateForm3.addControl(`field${i}`, new FormControl('', [Validators.required]));
      this.validateForm3.addControl(`field${i}`, new FormControl(''));
    }
    for (let i = 0; i < 50; i++) {
      this.selectControlArray.push({ index: i, show: true });
      // this.validateForm4.addControl(`field${i}`, new FormControl('', [Validators.required]));
      this.validateForm4.addControl(`field${i}`, new FormControl(''));
    }
    for (let i = 0; i < 50; i++) {
      this.switchControlArray.push({ index: i, show: true });
      // this.validateForm5.addControl(`field${i}`, new FormControl('', [Validators.required]));
      this.validateForm5.addControl(`field${i}`, new FormControl(''));
    }


  }

}
