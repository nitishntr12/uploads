import { Component, OnInit} from '@angular/core';
import {UploadsService} from "../service/uploads.service";
import {FormGroup,Validators, FormBuilder} from "@angular/forms";
import {FormHelperService} from "../service/form-helper.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css']
})
export class AddTopicComponent implements OnInit {

  statusTopicAdded=false;
  errorMessage:string;
  baseImageUrl:string;

  dataGoingToServe=false;
  private statusMessage: string;

  addTopicForm: FormGroup;

  constructor(private uploadService:UploadsService,private router:Router,private fb:FormBuilder) {

  }

  ngOnInit() {
    this.addTopicForm=this.fb.group({
      ChapterId:[FormHelperService.chapterId,Validators.required],
      Name:['',Validators.required],
      Order:['',Validators.required]
    })

  }

  saveEvent(addTopicFormData) {
    //addTopicFormData['Name'].charAt(0).toUpperCase()
    this.dataGoingToServe=true;
    let formData=addTopicFormData;
    formData.Name=formData.Name.substr(0, 1).toUpperCase() + formData.Name.substr(1);
    //console.log("Form Data is"+formData.Name);
    this.uploadService.addTopic(addTopicFormData)
      .subscribe(statusTopicAdded=>{this.statusTopicAdded=statusTopicAdded;this.dataGoingToServe=false;this.setStatusMessage();},error=>this.errorMessage=<any> error);

  }

  setStatusMessage(){
    if(this.statusTopicAdded){
      this.statusMessage="Added Successfully,You can add another here or press Cancel to Go Back";
    }else {
      this.statusMessage="Not Added Successfully, Try again";
    }
  }

  cancel(form) {
    this.addTopicForm.reset();
    this.router.navigate(['/home']);
  }

  getChapterName(){
    return FormHelperService.chapterName;
  }
  getChapterId(){
    return FormHelperService.chapterId;
  }


}


