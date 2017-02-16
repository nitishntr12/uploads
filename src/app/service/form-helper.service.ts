import { Injectable } from '@angular/core';
import {UploadsService} from "./uploads.service";

@Injectable()
export class FormHelperService {

  constructor(private uploaderService:UploadsService) { }

  public static chapterId:number=5;
  public static chapterName:string="alcohol";
  public static topicId:number=194;
  public static topicName:string="cannizaro";


}
