import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskItemComponent } from './task-item/task-item.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    TaskItemComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    TaskItemComponent
  ]
})
export class ComponentsModule { }
