import { NgModule } from '@angular/core';
import {MatButtonModule, MatSelectModule, MatTooltipModule, MatTabsModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({    
    imports: [
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      MatToolbarModule,
      MatGridListModule,
      MatCardModule,
      MatButtonToggleModule,
      MatIconModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatSnackBarModule,
      MatCheckboxModule,
      MatDialogModule,
      MatSelectModule,
      MatTooltipModule,
      MatTabsModule
    ],
    exports:[
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatGridListModule,
        MatCardModule,
        MatButtonToggleModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatDialogModule,
        MatSelectModule,
        MatTooltipModule,
        MatTabsModule
    ]
  })

  export class MaterialModule { }