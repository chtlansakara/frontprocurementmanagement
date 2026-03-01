import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatTab, MatTabsModule } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
//Material Table
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
// Material Grid List
import { MatGridListModule } from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatPaginatorModule,
    MatMenuModule,
    MatRadioModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    MatListModule,
    MatTooltipModule,
    MatTabsModule,
    MatSortModule,
    MatPaginatorModule,
    MatGridListModule,
    MatCheckboxModule,
    MatStepperModule,
    MatBadgeModule
  ]
})
export class AngularmaterialModule { }
