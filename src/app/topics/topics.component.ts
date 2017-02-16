import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormHelperService} from "../service/form-helper.service";
import {UploadsService} from "../service/uploads.service";
import {Topic} from "../add-topic/topic";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topics',
  templateUrl: 'topics.component.html',
  styleUrls: ['topics.component.css']
})
export class TopicsComponent implements OnInit {

  constructor(private uploadService:UploadsService,private router:Router) {
    this.length = this.data.length;
  }

  private data:Topic[]=[];
  private showPopUp:boolean=false;
  private dataGoingToServer=false;


  errorMessage:string;
  ngOnInit() {
    console.log("Inside NG On Init topics");
    this.data.length=0;
    this.uploadService.getTopicsList(FormHelperService.chapterId)
      .subscribe(topics=>{this.data=topics;
          this.onChangeTable(this.config)},
        error=>this.errorMessage=<any>error);

  }

  public onCellClick(data: any) {
    this.showPopUp=true;
    console.log("Tables on cell Clicked");
    FormHelperService.topicId=data.row.Id;
    FormHelperService.topicName=data.row.Name;
  }

  isShowPopUp(event){

    console.log("IS show popup event called");

    let element = document.getElementById('custom-modal-id');
    if(element && element.contains(event.target)){
      this.showPopUp = true;
    }
    else {
      this.showPopUp = false;
    }
  }

  openAddNewConceptForm(){
    this.dataGoingToServer=true;
    //console.log("Open add new Concept form Clicked");
    this.uploadService.getConceptsBaseImageUrl(FormHelperService.topicId)
      .subscribe(result=>{FormHelperService.baseImageUrl=result["baseImageUrl"];
          this.dataGoingToServer=false;
          this.router.navigate(['/concept'])},
        error=>this.errorMessage=<any>error);
  }


  openAddNewProblemForm(){
    this.dataGoingToServer=true;
    //console.log("Open add new Problem form Clicked");
    this.uploadService.getProblemsBaseImageUrl(FormHelperService.topicId)
      .subscribe(result=>{FormHelperService.baseImageUrl=result["baseImageUrl"];
          this.dataGoingToServer=false;
          this.router.navigate(['/problem'])

        },
        error=>this.errorMessage=<any>error);

  }


  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Id', name: 'Id'},
    {title: 'Name', name: 'Name',},
    {title:'Order',name:'Order'},
    {title:'IsCompetition',name:'IsCompetition'},
    {title:'IsBoard',name:'IsBoard'}
  ];


  public page:number = 1;
  public itemsPerPage:number = 5;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };


  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }



}
