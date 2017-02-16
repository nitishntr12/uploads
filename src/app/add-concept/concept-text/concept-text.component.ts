import {Component, OnInit, Input, NgZone, Inject, EventEmitter} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {NgUploaderOptions, UploadedFile, NgUploaderService} from "ngx-uploader";
import {Ruby} from "ng2-prism/languages/ruby";
import {Codeblock} from 'ng2-prism/codeblock';
import {FormHelperService} from "../../service/form-helper.service";
import {UploadsService} from "../../service/uploads.service";


@Component({
  selector: 'app-concept-text',
  templateUrl: './concept-text.component.html',
  styleUrls: ['./concept-text.component.css'],

})
export class ConceptTextComponent  implements OnInit{

  @Input()baseImageUrl;
  @Input('group')
  public ConceptJson: FormGroup;
  TypeSelected:string;

  types = [
    'Image',
    'Text'
  ];

  options: NgUploaderOptions;
  response: any;
  sizeLimit: number = 1000000; // 1MB
  previewData: any;
  errorMessage: string;
  inputUploadEvents: EventEmitter<string>;

  ngOnInit(): void {
    console.log("Base Image Url got is "+this.baseImageUrl);
    this.options = new NgUploaderOptions({
      url: 'http://mistu.org/etutor/admin/uploadImages.php',
      filterExtensions: true,
      allowedExtensions: ['jpg', 'png'],
      data: {'id':12, 'path':this.baseImageUrl },
      autoUpload: false,
      fieldName: 'file',
      fieldReset: true,
      maxUploads: 2,
      method: 'POST',
      previewUrl: true,
      withCredentials: false,
    });
  }



  constructor(@Inject(NgZone) private zone: NgZone,private uploadsService:UploadsService) {

    this.inputUploadEvents = new EventEmitter<string>();
  }

  startUpload() {
    this.inputUploadEvents.emit('startUpload');
  }

  beforeUpload(uploadingFile: UploadedFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      this.errorMessage = 'File is too large!';
    }
  }

  handleUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          this.response = JSON.parse(data.response);
          this.ConceptJson.patchValue({Text: data['originalName']});
          console.log("ConceptPartText is "+data['originalName']);
        }
      });
    });
  }

  handlePreviewData(data: any) {
    this.previewData = data;
  }
}
