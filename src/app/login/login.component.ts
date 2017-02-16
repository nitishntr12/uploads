import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm:FormGroup;

  constructor(private _fb:FormBuilder) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      password:['',[Validators.required,Validators.minLength(5)]],
    });
  }

}
