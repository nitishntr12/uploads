import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {routes} from "./app.routes";
import {MaterialModule} from "@angular/material";
import {AddTopicComponent} from './add-topic/add-topic.component';
import {UploadsService} from "./service/uploads.service";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import 'hammerjs';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import {PaginationModule, PopoverModule} from "ng2-bootstrap";
import { ChaptersComponent } from './add-topic/chapters/chapters.component';
import { TopicsComponent } from './add-topic/topics/topics.component';
import { AddConceptComponent } from './add-concept/add-concept.component';
import { ConceptTextComponent } from './add-concept/concept-text/concept-text.component';
import {NgUploaderModule} from "ngx-uploader";
import {FormHelperService} from "./service/form-helper.service";
import {LoginService} from "./service/login.service";
import { AddProblemComponent } from './add-problem/add-problem.component';
import { ProblemTextComponent } from './add-problem/problem-text/problem-text.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddTopicComponent,
    ChaptersComponent,
    TopicsComponent,
    AddConceptComponent,
    ConceptTextComponent,
    AddProblemComponent,
    ProblemTextComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    MaterialModule.forRoot(),
    NgxDatatableModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    NgUploaderModule,
    PopoverModule.forRoot()

  ],
  providers: [UploadsService,LoginService],
  bootstrap: [AppComponent],



})
export class AppModule { }
