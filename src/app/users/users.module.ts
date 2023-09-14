import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {TableModule} from "primeng/table";
import { TablerIconsModule } from 'angular-tabler-icons';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxPaginationModule} from 'ngx-pagination'

@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    TablerIconsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
  ]
})
export class UsersModule { }
