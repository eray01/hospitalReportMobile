import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.page.html',
  styleUrls: ['./add-report.page.scss']
})
export class AddReportPage implements OnInit {
  id: any;
  isEdit: boolean;
  title: string;
  name: any;
  tcNo: any;
  blood: any;
  address: any;
  fileId: any;
  selectedFileOne: File;
  selectedFileTwo: File;
  selectedFileThree: File;
  reportDetail: any = {};
  addUserSection: boolean;
  imageArr: any;
  editImage: any = { one: '', two: '', three: '' };
  showReport = false;
  userDate: any;
  toggle: boolean;
  toggleText = 'Rapor Ekleme';
  color = 'success';
  // public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public commonService: CommonService,
    public dataService: ReportService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(val => {
      this.id = val.id;
      console.log('gelen id', this.id);
      if (this.id) {
        this.isEdit = true;
      }
      this.title = this.isEdit ? 'Rapor Düzenleme' : 'Hasta ve Rapor Ekleme';
    });
  }

  toggleGroup() {
    this.toggle = !this.toggle;
    this.toggleText = this.toggle
      ? 'Kullanıcı Eklemeye Geri Dön'
      : 'Rapor Ekleme';
    this.color = this.toggle ? 'warning' : 'success';
  }

  addUser() {
    this.userDate = document.getElementsByName('dateUser')[0];
    this.userDate = this.userDate.value;

    if (this.name && this.fileId && this.tcNo && this.userDate) {
      this.dataService
        .postUser(
          this.fileId,
          this.name,
          this.tcNo,
          this.blood,
          this.address,
          this.userDate
        )
        .then((data: any) => {
          console.log(data, 'kullanıcı post Edildi');
          if (data.error) {
            if (data.error === 'Internal Server Error') {
              this.commonService.presentAlert(
                'Hata',
                'Kullanıcı eklenemedi. Girdiğiniz değerleri kontrol edin.'
              );
            }
            if (data.error.text) {
              return window.alert(data.error.text);
            }
          }

          // rapor ekleme kısmındaki dosya no burda veriliyor
          this.reportDetail.fileNo = this.fileId;
          this.showReport = true;
          return (this.addUserSection = true);
        });
    } else {
      this.commonService.presentAlert('Hata', 'Lütfen Tüm Bilgileri Doldurunuz');
    }
  }

  updateMyDate($event) {
    console.log($event, 'date');
  }

  back() {
    this.navCtrl.pop();
  }
}
