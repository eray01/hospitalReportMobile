import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ReportService } from '../report.service';
import { Platform, NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
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
  searchQuery: any = [];
  allList: any = [];
  loading = false;
  constructor(
    public storage: Storage,
    public dataService: ReportService,
    public platform: Platform,
    public navCtrl: NavController,
    public router: Router,
    public commons: CommonService,
  ) { }

  ngOnInit() {
    // console.log('Loading dismissed!');
    // this.platform.ready().then(() => {
    //   this.storage.get('token').then(val => {
    //     this.getUser();
    //     this.getAllReport();
    //   });
    // });
  }

  getUser() {
    this.sendValue = [];
    this.dataService.getUser().then((data: any) => {
      this.userList = data;
      this.allList = data;
      this.loading = true;
    });
  }

  ionViewDidEnter() {
    this.storage.get('token').then(val => {
      this.getUser();
      // this.getAllReport();
    });
  }
  getAllReport() {
    this.dataService.getAllReports().then((val: any) => {
      this.reportList = val;
      this.userList.forEach(element => {
        this.reportList.forEach(el => {
          if (element.fileId === el.dosyaNo) {
            this.exportData.push({
              'Dosya No': element.fileId,
              'Ad Soyad': element.name,
              'TC No': element.tcId,
              'Kan Grubu': element.blood,
              Tarih: element.date,
              Adres: element.address,
              Tanı: el.tani,
              RaporEden: el.raporEden,
              Rapor: el.rapor,
              Myloblast: el.myloblast,
              Promyelosit: el.promyelosit,
              Myelosit: el.myelosit,
              Metamyelosit: el.metamyelosit,
              Comak: el.comak,
              Parcali: el.parcali,
              BazofilikSeri: el.bazofilikSeri,
              EozinofilikSeri: el.eozinofilikSeri,
              Lenfosit: el.lenfosit,
              Promonosit: el.promonosit,
              Monosit: el.monosit,
              PlazmaHucresi: el.plazmaHucresi,
              Proeritroblast: el.proeritroblast,
              BazofilikErit: el.bazofilikErit,
              PolikromalofilikErit: el.polikromalofilikErit,
              OrtokromantofilikErit: el.ortokromantofilikErit,
              Megakaryositler: el.megakaryositler,
              Sellulerite: el.sellulerite
            });
          }
        });
      });
    });
  }

  /*search işlemi */
  search() {
    if (this.searchQuery.length >= 3) {
      this.dataService.getUserSearch(this.searchQuery).then((data: any) => {
        console.log(data);
        this.userList = data;
      });
    } else {
      return (this.userList = this.allList);
    }
  }

  openDetail(id) {
    console.log(id, 'item tıklandı');

    // this.navCtrl.navigateForward("/list/");
    this.router.navigate(['/list', id]);
  }

  display(item) {
    console.log(item);
  }

  addReport(id) {
    // rapor eklemek ve editlemek için id üzerinden kontrol sağlanır.
    if (id) {
      this.router.navigate(['/add-report', id]);
    } else {
      this.router.navigate(['/add-report', '']);
    }
  }

  logout() {
    this.storage.set('checklogin', '');
    this.navCtrl.navigateRoot('');
    
  }
}
