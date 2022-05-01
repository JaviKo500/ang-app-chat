import { NgModule } from '@angular/core';
import { ErrorMsgDirective } from './error-msg.directive';



@NgModule({
  declarations: [ErrorMsgDirective],
  exports: [
    ErrorMsgDirective
  ]
})
export class DirectivesModule { }
