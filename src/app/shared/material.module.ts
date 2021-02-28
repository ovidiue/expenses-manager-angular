import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
