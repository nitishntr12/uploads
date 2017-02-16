import { Component, OnInit,ElementRef, HostListener} from '@angular/core';
import {UploadsService} from "../service/uploads.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {FormHelperService} from "../service/form-helper.service";
import {MdDialogRef, MdDialog} from "@angular/material";

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css']
})
export class AddTopicComponent implements OnInit {

  chapterId:number;
  chapterName:string="Select a chapter from the table to add a topic";
  topicId:number;
  topicName:string;
  statusTopicAdded=false;
  errorMessage:string;
  baseImageUrl:string;

  isAddNewTopicFormOpen=false;
  isAddNewConceptFormOpen=false;
  isAddNewProblemFormOpen=false;

  isButtonAddNewTopicFormOpen=false;

  dataGoingToServe=false;
  private statusMessage: string;


  updateChapter(chapter){
    this.chapterId=chapter.Id;
    this.chapterName=chapter.Name;
    //console.log("chapter Id is "+this.chapterId + "and Name is "+ this.chapterName);
    this.isButtonAddNewTopicFormOpen=true;
  }

  updateTopic(topic){
    this.showPopUp = true;
    this.topicId=topic.Id;
    this.topicName=topic.Name;
    //console.log("Topic Id is "+ this.topicId +"and Topic Name is "+ this.topicName);
  }

  ngOnChanges(){

  }

  openAddNewTopicForm(){
    //console.log("Open add new Form clicked");
    this.isAddNewTopicFormOpen=true;
    this.isAddNewConceptFormOpen=false;
    this.isAddNewProblemFormOpen=false;
  }

  openAddNewConceptForm(){
    this.dataGoingToServe=true;
    //console.log("Open add new Concept form Clicked");
    this.uploadService.getConceptsBaseImageUrl(this.topicId)
      .subscribe(result=>{this.baseImageUrl=result["baseImageUrl"];
          this.isAddNewConceptFormOpen=true;
          this.isAddNewTopicFormOpen=false;
          this.isAddNewProblemFormOpen=false;
           this.dataGoingToServe=false},
        error=>this.errorMessage=<any>error);
  }


  openAddNewProblemForm(){
    this.dataGoingToServe=true;
    //console.log("Open add new Problem form Clicked");
    this.uploadService.getProblemsBaseImageUrl(this.topicId)
      .subscribe(result=>{this.baseImageUrl=result["baseImageUrl"];
          this.isAddNewProblemFormOpen=true;
          this.dataGoingToServe=false;
          this.isAddNewConceptFormOpen=false;
          this.isAddNewTopicFormOpen=false;
          },
        error=>this.errorMessage=<any>error);

  }


  showBaseImageUrl(){
    //console.log("Inside add Topic Componnet ,Base Image Url is : "+this.baseImageUrl);
  }

  addTopicForm: FormGroup;
  ChapterId:FormControl=new FormControl('',Validators.required)
  Name: FormControl = new FormControl('', Validators.required)
  Order: FormControl = new FormControl('', Validators.required)
  showPopUp:boolean = false;

  constructor(private uploadService:UploadsService) {

  }


  isShowPopUp(event){
    let element = document.getElementById('custom-modal-id');
    if(element && element.contains(event.target)){
      this.showPopUp = true;
    }
    else {
      this.showPopUp = false;
    }
  }



  ngOnInit() {
    this.addTopicForm= new FormGroup({
      ChapterId:this.ChapterId,
      Name: this.Name,
      Order: this.Order
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
    this.closeAllForm();
    this.statusMessage=null;
  }

  handleNewConceptCancelled(){
    this.closeAllForm();
  }

  handleNewProblemCancelled(){
    this.closeAllForm();
  }

  closeAllForm(){
    this.isAddNewTopicFormOpen=false;
    this.isAddNewProblemFormOpen=false;
    this.isAddNewConceptFormOpen=false;
  }


}


