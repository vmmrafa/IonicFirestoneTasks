import { NgModule } from '@angular/core';

import { TaskFormPageRoutingModule } from './task-form-routing.module';

import { TaskFormPage } from './task-form.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    TaskFormPageRoutingModule
  ],
  declarations: [TaskFormPage]
})
export class TaskFormPageModule {}
