import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage implements OnInit {

  imageUrlArray: any = [];
  index: any;
  counter: any = 0;
  reportId: any;
  searchList: any = [];
  isLoading = false;
  temp: any = [];
  test: any = [];
  
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  // public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(public route: ActivatedRoute, public dataService: ReportService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.reportId = params['id'];
    })
    this.getReport(this.reportId);
  }

  getReport(reportId) {
    console.log(reportId, 'servis');
    this.dataService.getReportWithFileId(reportId).then((data: any) => {
      console.log(data);
      this.searchList.push(data);
      this.searchList.forEach((el) => {
        this.imageUrlArray.push(el.resim1, el.resim2, el.resim3);
        this.test.push({ image1: el.resim1, image2: el.resim2, image3: el.resim3 });
        console.log(this.test, this.imageUrlArray);
        
      });
      this.isLoading = true;
    });
  }

}
