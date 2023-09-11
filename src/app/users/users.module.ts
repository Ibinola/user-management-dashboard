import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {TableModule} from "primeng/table";
// import { TablerIconsModule } from "@tabler/icons";
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    TablerIconsModule,
    ReactiveFormsModule,
  ]
})
export class UsersModule { }
