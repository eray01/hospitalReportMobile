import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  token: string;
  userList: any = [];
  searchList: any = [];
  sendValue: any = [];
  showList = false;
  reportList: any = [];
  exportData: any = [];
  date: Date = new Date();
  constructor(public storage: Storage, public dataService: ReportService) {
    this.storage.get('token').then(val => {
      console.log(val, 'token');
    });
  }
  
  public async getUser() {
    this.sendValue = [];
    await this.dataService.getUser().then((data: any) => {
      //   console.log(data, 'userList');
      this.userList = data;
    });

  }
  getAllReport() {
    this.dataService.getAllReports().then((val: any) => {
      //  console.log(val, 'allreports');
      this.reportList = val;
      console.log(this.reportList, 'report', this.userList, 'user');
      this.userList.forEach(element => {
        this.reportList.forEach(el => {
          if (element.fileId === el.dosyaNo) {
            this.exportData.push({
              'Dosya No': element.fileId,
              'Ad Soyad': element.name,
              'TC No': element.tcId,
              'Kan Grubu': element.blood,
              'Tarih': element.date,
              'Adres': element.address,
              'Tanı': el.tani,
              'RaporEden': el.raporEden,
              'Rapor': el.rapor,
              'Myloblast': el.myloblast,
              'Promyelosit': el.promyelosit,
              'Myelosit': el.myelosit,
              'Metamyelosit': el.metamyelosit,
              'Comak': el.comak,
              'Parcali': el.parcali,
              'BazofilikSeri': el.bazofilikSeri,
              'EozinofilikSeri': el.eozinofilikSeri,
              'Lenfosit': el.lenfosit,
              'Promonosit': el.promonosit,
              'Monosit': el.monosit,
              'PlazmaHucresi': el.plazmaHucresi,
              'Proeritroblast': el.proeritroblast,
              'BazofilikErit': el.bazofilikErit,
              'PolikromalofilikErit': el.polikromalofilikErit,
              'OrtokromantofilikErit': el.ortokromantofilikErit,
              'Megakaryositler': el.megakaryositler,
              'Sellulerite': el.sellulerite,
            });
          }
        });

      });
    });
  }
  
  /*search işlemi */
  // search(searhquery: string[]) {
  //   this.isLoading = true;
  //   if (searhquery.length >= 3) {
  //     this.sendValue = [];
  //     this.dataSource = null;
  //     this.dataService.getUserSearch(searhquery).then((data: any) => {
  //       // console.log(data);
  //       this.dataSource = new MatTableDataSource(data);
  //       this.isLoading = false;
  //     });
  //   } else {
  //     this.isLoading = false;
  //     this.dataSource = new MatTableDataSource(this.userList);
  //   }
  // }


  logout() {
    localStorage.clear();
    this.dataService.getToken();
  }
}
