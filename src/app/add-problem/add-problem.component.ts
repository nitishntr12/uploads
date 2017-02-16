import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, FormArray} from "@angular/forms";
import {UploadsService} from "../service/uploads.service";
import {Router} from "@angular/router";
import {FormHelperService} from "../service/form-helper.service";

@Component({
  selector: 'app-add-problem',
  templateUrl: './add-problem.component.html',
  styleUrls: ['./add-problem.component.css']
})
export class AddProblemComponent implements OnInit {

  public addProblemForm:FormGroup;
  dataGoingToServer=false;
  response:string;
  errorMessge:any;
  GreetingMessage:string;

  TypeSelected:string;

  types = [
    'Single Correct',
    'Multiple Correct'
  ];
  keys=['A','B','C','D'];
  levels=['1','2','3'];

  constructor(private _fb:FormBuilder,private uploadService:UploadsService,private router:Router) { }

  ngDoCheck(){
    console.log("value changed"+this.TypeSelected);
    if(this.TypeSelected==this.types[0]){
      this.addProblemForm.get('ProblemJson.AnswerKeyMultipleCorrect').reset();
    }else if(this.TypeSelected==this.types[1]){
      this.addProblemForm.get('ProblemJson.AnswerKeySingleCorrect').reset();
    }
  }

  ngOnInit() {
    this.addProblemForm=this._fb.group({
      Name:['',[Validators.required,Validators.minLength(5)]],
      TopicId:[FormHelperService.topicId,[Validators.required]],
      Order:['',Validators.required],
      Description:[''],
      QuestionTag:[''],
      Level:['',Validators.required],
      TypeOfQuestion:['',Validators.required],
      BaseImageUrl:[FormHelperService.baseImageUrl,Validators.required],
      ProblemJson: this._fb.group({
        QuestionText:this._fb.array([]),
        Option1Text:this._fb.array([]),
        Option2Text:this._fb.array([]),
        Option3Text:this._fb.array([]),
        Option4Text:this._fb.array([]),
        SolutionText:this._fb.array([]),
        AnswerKeyMultipleCorrect:this._fb.group(
          {
            A:[false],
            B:[false],
            C:[false],
            D:[false]
          }
        ),
        AnswerKeySingleCorrect:['']

      })

    });

    this.addProblemJsonControls();
  }

  initQuestionParts(){
    return this._fb.group({
      Type: ['', Validators.required],
      Text:['',Validators.required]
    })
  }

  addProblemJsonControls(){
    const control1 = <FormArray>this.addProblemForm.get('ProblemJson.QuestionText');
    control1.push(this.initQuestionParts());
    const control2 = <FormArray>this.addProblemForm.get('ProblemJson.Option1Text');
    control2.push(this.initQuestionParts());
    const control3 = <FormArray>this.addProblemForm.get('ProblemJson.Option2Text');
    control3.push(this.initQuestionParts());
    const control4 = <FormArray>this.addProblemForm.get('ProblemJson.Option3Text');
    control4.push(this.initQuestionParts());
    const control5 = <FormArray>this.addProblemForm.get('ProblemJson.Option4Text');
    control5.push(this.initQuestionParts());
    const control6 = <FormArray>this.addProblemForm.get('ProblemJson.SolutionText');
    control6.push(this.initQuestionParts());
  }

  addQuestionPart(controlName:any) {

    if(controlName=="QuestionText"){
      const control = <FormArray>this.addProblemForm.get('ProblemJson.QuestionText');
      control.push(this.initQuestionParts());
    }else  if(controlName=="Option1Text"){
      const control = <FormArray>this.addProblemForm.get('ProblemJson.Option1Text');
      control.push(this.initQuestionParts());
    }
    else  if(controlName=="Option2Text"){
      const control = <FormArray>this.addProblemForm.get('ProblemJson.Option2Text');
      control.push(this.initQuestionParts());
    }
    else  if(controlName=="Option3Text"){
      const control = <FormArray>this.addProblemForm.get('ProblemJson.Option3Text');
      control.push(this.initQuestionParts());
    }
    else  if(controlName=="Option4Text"){
      const control = <FormArray>this.addProblemForm.get('ProblemJson.Option4Text');
      control.push(this.initQuestionParts());
    }
    else  if(controlName=="SolutionText"){
      const control = <FormArray>this.addProblemForm.get('ProblemJson.SolutionText');
      control.push(this.initQuestionParts());
    }

    /* subscribe to individual address value changes */
    // addrCtrl.valueChanges.subscribe(x => {
    //   console.log(x);
    // })
  }

  removeProblemPart(controlName:string,i: number) {
    if(controlName=="QuestionText"){
      const control = <FormArray>this.addProblemForm.get('ProblemJson.QuestionText');
      control.removeAt(i);
    }else  if(controlName=="Option1Text"){
      const control = <FormArray>this.addProblemForm.get('ProblemJson.Option1Text');
      control.removeAt(i);
    }
    else  if(controlName=="Option2Text"){
      const control = <FormArray>this.addProblemForm.get('ProblemJson.Option2Text');
      control.removeAt(i);
    }
    else  if(controlName=="Option3Text"){
      const control = <FormArray>this.addProblemForm.get('ProblemJson.Option3Text');
      control.removeAt(i);
    }
    else  if(controlName=="Option4Text"){
      const control = <FormArray>this.addProblemForm.get('ProblemJson.Option4Text');
      control.removeAt(i);
    }
    else  if(controlName=="SolutionText"){
      const control = <FormArray>this.addProblemForm.get('ProblemJson.SolutionText');
      control.removeAt(i);
    }

  }

  save(model) {
    // call API to save
    // ...
    this.dataGoingToServer=true;
    console.log("Save new Form API Called");
    this.uploadService.addProblem(model)
      .subscribe(response=>{this.response=response;
        this.dataGoingToServer=false;this.setGreetingMessage();
      }, error=>this.errorMessge=<any>error);
    console.log(JSON.stringify(this.response));


  }

  setGreetingMessage(){
    if(this.response["Success"]=="OK"){
      this.GreetingMessage="Success, Go Back and select a Topic To add new Concept"
      this.addProblemForm.reset();
    }else {
      this.GreetingMessage="OOOps, Some error occured, try again!!";

    }
  }

  cancelClicked(){
    this.addProblemForm.reset();
    this.router.navigate(['/home']);
  }

}
