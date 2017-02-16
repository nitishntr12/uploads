import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Chapter} from "../add-topic/chapter";
import {Topic} from "../add-topic/topic";

@Injectable()
export class UploadsService {

  getChaptersUrl="http://mistu.org/etutor/admin/getChapters.php/";
  getTopicsUrl="http://mistu.org/etutor/admin/getTopicsbyChapterId.php";
  addTopicUrl="http://mistu.org/etutor/admin/insertTopic.php";
  addConceptUrl="http://mistu.org/etutor/admin/insertNewConcept.php";
  addProblemUrl="http://mistu.org/etutor/admin/insertNewProblem.php";
  baseImageConceptUrl="http://mistu.org/etutor/admin/getConceptsBaseImageUrl.php";
  baseImageProblemUrl="http://mistu.org/etutor/admin/getProblemsBaseImageUrl.php";

  constructor(private http:Http) { }

  getChaptersList():Observable<Chapter[]>{
    return this.http.get(this.getChaptersUrl)
      .map((response:Response)=><Chapter[]> response.json())
      .do(data=>console.log("Subjects:"+ JSON.stringify(data)));
  }

  getTopicsList(Id):Observable<Topic[]>{
    return this.http.get(this.getTopicsUrl+"?Id="+String(Id))
      .map((response:Response)=><Topic[]> response.json())
      .do(data=>console.log("Topics:"+ JSON.stringify(data)));
  }

  addTopic(newTopic):Observable<any>{
    console.log("Data sent to server is "+ JSON.stringify(newTopic));
    let headers = new Headers();
    headers.append('Content-Type',
      'application/json');
    return this.http.post(this.addTopicUrl,JSON.stringify(newTopic),headers)
      .map((response:Response)=><any> response.json())
      .do(data=>console.log("Status of Question Uploaded"+JSON.stringify(data)));
  }

  addConcept(newConcept):Observable<any>{
    console.log("Data sent to server is "+ JSON.stringify(newConcept));
    let headers = new Headers();
    headers.append('Content-Type',
      'application/json');
    return this.http.post(this.addConceptUrl,JSON.stringify(newConcept),headers)
      .map((response:Response)=><any> response.json())
      .do(data=>console.log("Status of Question Uploaded"+JSON.stringify(data)));
  }

  addProblem(newProblem):Observable<any>{
    console.log("Data sent to server is "+ JSON.stringify(newProblem));
    let headers = new Headers();
    headers.append('Content-Type',
      'application/json');
    return this.http.post(this.addProblemUrl,JSON.stringify(newProblem),headers)
      .map((response:Response)=><any> response.json())
      .do(data=>console.log("Status of Question Uploaded"+JSON.stringify(data)));
  }


  getConceptsBaseImageUrl(topicId:number):Observable<any>{
    console.log("Get Concepts bse Image Url clled with :"+topicId);
    return this.http.get(this.baseImageConceptUrl+"?Id="+String(topicId))
      .map((response:Response)=><any> response.json())
      .do(data=>console.log("Base Image Url is "+ JSON.stringify(data)));
  }

  getProblemsBaseImageUrl(topicId:number):Observable<any>{
    return this.http.get(this.baseImageProblemUrl+"?Id="+String(topicId))
      .map((response:Response)=><any> response.json())
      .do(data=>console.log("Topics:"+ JSON.stringify(data)));

  }

}
