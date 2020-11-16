import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TestRoutingModule } from './test3-routing.module';

import { TestComponent } from './test3.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
  imports: [
    NzSwitchModule,
    NzSelectModule,
    NzCascaderModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TestRoutingModule
  ],
  declarations: [TestComponent],
  exports: [TestComponent]
})
export class TestModule {}
