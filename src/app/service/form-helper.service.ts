import { Injectable } from '@angular/core';
import {UploadsService} from "./uploads.service";

@Injectable()
export class FormHelperService {

  constructor() { }

  public static chapterId:number;
  public static chapterName:string;
  public static topicId:number;
  public static topicName:string;
  public static baseImageUrl:string;


}
