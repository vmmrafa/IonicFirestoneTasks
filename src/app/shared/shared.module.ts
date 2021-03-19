import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  exports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class SharedModule { }
