import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule, IonicModule.forRoot()],
  bootstrap: [AppComponent],
})
export class AppModule { }
