import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TableModule} from "primeng/table";
import { UsersModule } from './users/users.module';
import { TablerIconsModule } from "angular-tabler-icons";
import * as TablerIcons from "angular-tabler-icons/icons";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    HttpClientModule,
  ],
  providers: [],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
