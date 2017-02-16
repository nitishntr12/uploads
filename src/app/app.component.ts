import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormHelperService} from "./service/form-helper.service";
import {UploadsService} from "./service/uploads.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[FormHelperService]
})
export class AppComponent {


}
