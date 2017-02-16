import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormArray, Validators, FormGroup, FormBuilder} from "@angular/forms";
import {UploadsService} from "../service/uploads.service";
import {Route, Router} from "@angular/router";
import {FormHelperService} from "../service/form-helper.service";

@Component({
  selector: 'app-add-concept',
  templateUrl: './add-concept.component.html',
  styleUrls: ['./add-concept.component.css']
})
export class AddConceptComponent implements OnInit {
  public myForm: FormGroup;
  dataGoingToServer=false;
  response:string;
  errorMessge:any;
  GreetingMessage:string;
  constructor(private _fb: FormBuilder,private uploadService:UploadsService,private router:Router) {

  }

  ngOnInit() {

    this.myForm = this._fb.group({
      Name: ['', [Validators.required, Validators.minLength(5)]],
      TopicId:[FormHelperService.topicId,Validators.required],
      Order:['',Validators.required],
      Description:[''],
      QuestionTag:[''],
      BaseImageUrl:[FormHelperService.baseImageUrl,Validators.required],
      ConceptJson: this._fb.array([])
    });

    // add address
    this.addAddress();

    /* subscribe to addresses value changes */
    // this.myForm.controls['addresses'].valueChanges.subscribe(x => {
    //   console.log(x);
    // })
  }

  initAddress() {
    return this._fb.group({
      Type: ['', Validators.required],
      Text:['',Validators.required]
    });
  }

  addAddress() {
    const control = <FormArray>this.myForm.controls['ConceptJson'];
    const addrCtrl = this.initAddress();

    control.push(addrCtrl);

    /* subscribe to individual address value changes */
    // addrCtrl.valueChanges.subscribe(x => {
    //   console.log(x);
    // })
  }

  removeAddress(i: number) {
    const control = <FormArray>this.myForm.controls['ConceptJson'];
    control.removeAt(i);
  }

  save(model) {
    // call API to save
    // ...
    this.dataGoingToServer=true;
    console.log("Save new Form API Called");
    this.uploadService.addConcept(model)
      .subscribe(response=>{this.response=response;
      this.dataGoingToServer=false;this.setGreetingMessage()}, error=>this.errorMessge=<any>error);
    console.log(JSON.stringify(this.response));


  }

  setGreetingMessage(){
    if(this.response["Success"]=="OK"){
      this.GreetingMessage="Cool!!   Concept Has been SuccessFully added, Go Back and Again Select a new Topic To add new Concept"
      this.myForm.reset();
    }else {
      this.GreetingMessage="OOOps, Some error occured, try again!!"

    }
  }

  cancelClicked(){
    this.myForm.reset();
    this.router.navigate(['/home']);
  }

  getTopicName(){
    return FormHelperService.topicName;
  }
}
