import { Component, OnInit } from '@angular/core';
import {FormHelperService} from "../service/form-helper.service";
import {Router} from "@angular/router";
import {UploadsService} from "../service/uploads.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {

  }




  statusTopicAdded=false;
  errorMessage:string;

  dataGoingToServe=false;
  private statusMessage: string;

  openAddNewTopicForm(){
    this.router.navigate(['/topic']);

  }

  constructor(private uploadService:UploadsService,private router:Router) {

  }

  setStatusMessage(){
    if(this.statusTopicAdded){
      this.statusMessage="Added Successfully,You can add another here or press Cancel to Go Back";
    }else {
      this.statusMessage="Not Added Successfully, Try again";
    }
  }

  getChapterId(){
    return FormHelperService.chapterId;
  }

}
