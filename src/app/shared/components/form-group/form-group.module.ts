import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppFormGroupComponent } from '@shared/components/form-group/app-form-group.component';
import { ErrorComponent } from '@shared/components/form-group/error/error.component';
import { FormFieldComponent } from '@shared/components/form-group/field/form-field.component';
import { LabelComponent } from '@shared/components/form-group/label/label.component';

const declarationsAndExports = [
  LabelComponent,
  AppFormGroupComponent,
  ErrorComponent,
  FormFieldComponent,
];

@NgModule({
  declarations: [...declarationsAndExports],
  exports: [...declarationsAndExports],
  imports: [
    CommonModule
  ]
})
export class FormGroupModule {}
