import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../report.service';
import { CommonService } from '../common.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage implements OnInit {

  config: ExportAsConfig = {
    type: 'xls',
    elementId: 'myTable',
  };

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
  constructor(public route: ActivatedRoute, 
    public dataService: ReportService, 
    public exportAsService: ExportAsService,
    private file: File,
    private fileOpener: FileOpener
    ) {
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
    });
  }

  exportAs(type) {
    let blob;
    this.config.type = type;
    // this.exportAsService.save(this.config, this.reportId + ' nolu rapor');
    this.exportAsService.get(this.config).subscribe(content => {
      console.log(content);
      // this.exportAsService.downloadFromDataURL(this.reportId + ' nolu rapor', content);
      this.saveAndOpenPdf(content, this.reportId + ' nolu rapor.pdf');
    });
  }

  saveAndOpenPdf(pdf: string, filename: string) {
    const writeDirectory =  this.file.externalDataDirectory;
    this.file.writeFile(writeDirectory, filename, this.convertBase64ToBlob(pdf, 'data:application/pdf;base64'), { replace: true })
      .then(() => {

        this.fileOpener.open(writeDirectory + filename, 'application/pdf')
          .catch(() => {
            console.log('Error opening pdf file');

          });
      })
      .catch(() => {
        console.error('Error writing pdf file');

      });
  }
  convertBase64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

}
