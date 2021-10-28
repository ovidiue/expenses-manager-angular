import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const importsAndExports = [
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatFormFieldModule,
  MatOptionModule,
  MatCheckboxModule,
  MatSelectModule,
];

@NgModule({
  imports: [...importsAndExports],
  exports: [...importsAndExports],
})
export class MaterialModule {}
