import {Component, OnInit,ElementRef, HostListener} from '@angular/core';
import {UploadsService} from "../service/uploads.service";
import {Chapter} from "../add-topic/chapter";
import {FormHelperService} from "../service/form-helper.service";

@Component({
  selector: 'app-chapters',
  templateUrl: 'chapters.component.html',
  styleUrls: ['chapters.component.css']
})
export class ChaptersComponent implements OnInit {

  constructor(private uploadService:UploadsService,private eRef: ElementRef) {
    this.length = this.data.length;
  }
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(event.toElement.nodeName == 'TD'){
      let trElements = event.target.parentNode.parentNode.children;
      for(let i=0;i<trElements.length;i++){
        for(let j=0;j<trElements[i].children.length;j++){
          trElements[i].children[j].className = "";
        }
        //trElements[i].children[1].className = "";
      }
     // debugger;

      for( let x=0;x<event.target.parentNode.children.length;x++){
        event.target.parentNode.children[x].className = "red-text ";
      }

    }
  }
  private data:Chapter[]=[];

  errorMessage:string;
  ngOnInit() {

    console.log("Inside NG On Init Chpters");
    this.uploadService.getChaptersList()
      .subscribe(chapters=>{this.data=chapters;this.onChangeTable(this.config)}, error=>this.errorMessage=<any>error);
  }

  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Chapter Id', name: 'Id'},
    {title: 'Chapter Name', name: 'Name',},
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

  public onCellClick(data: any): any {
    console.log(data);
    FormHelperService.chapterId=data.row.Id;
    FormHelperService.chapterName=data.row.Name;
  }



}
