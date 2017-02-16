import {Component, OnInit, EventEmitter, Inject, NgZone, Input} from '@angular/core';
import {UploadedFile, NgUploaderOptions} from "ngx-uploader";
import {UploadsService} from "../../service/uploads.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-problem-text',
  templateUrl: './problem-text.component.html',
  styleUrls: ['./problem-text.component.css']
})
export class ProblemTextComponent implements OnInit {

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
