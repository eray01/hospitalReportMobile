import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
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
  userDate: any;
  toggle: boolean;
  toggleText = 'Rapor Ekleme';
  color = 'success';
  date: any;
  loading = false;
  reportDate: any;
  reportImageArr: any = [];
  // public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public commonService: CommonService,
    public dataService: ReportService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.route.params.subscribe(val => {
      this.id = val.id;
      if (this.id) {
        this.isEdit = true;
      }
      this.title = this.isEdit ? 'Rapor Düzenleme' : 'Hasta ve Rapor Ekleme';
    });
  }

  toggleGroup() {

    if (!this.tcNo ||
      !this.name ||
      !this.blood ||
      !this.date ||
      !this.fileId ||
      !this.address) {
      return this.commonService.presentAlert('', 'Tüm bilgileri doldurunuz!');
    }
    this.toggle = !this.toggle;
    this.reportDetail.fileNo = this.fileId;
    // if (this.toggle) { // toggle true durumunda ise ilk kullanıcı eklemedir
    //   this.addUser();
    // }
    this.toggleText = this.toggle
      ? 'Kullanıcı Eklemeye Geri Dön'
      : 'Rapor Ekleme';
    this.color = this.toggle ? 'warning' : 'success';
  }

  addUser() {
    ""
    let size = 0, key;
    for (key in this.reportDetail) {
      if (this.reportDetail.hasOwnProperty(key)) { size++; }
    }
    console.log(size, 'objlength');
    if (size < 23) {
      return this.commonService.presentAlert('', 'Lütfen Eksik Alanları Doldurunuz');
    }
    this.dataService
      .postUser(
        this.fileId,
        this.name,
        this.tcNo,
        this.blood,
        this.address,
        this.date
      )
      .then((data: any) => {
        if (data.status === false) {
          this.commonService.presentAlert('Hata', data.message);
        }
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
        if (data.fileId) {
          this.onUpload();
        }
      });


    this.toggle = false;
  }

  uploadReport() {
    console.log(this.reportDetail, 'rapor Detayı');
    this.dataService.postReport(this.reportDetail, this.reportImageArr).then((data: any) => {
      console.log(data, 'rapor upload');

      if (data.status === false) {
        this.commonService.presentAlert('Hata', data.message);
      }
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
    });
  }

  /*Fotograf Yükleme ve Rapor Gönderme*/
  onUpload() {
    // rapor için gönderilecek olan image arrayimiz
    if (this.imageArr) {
      this.dataService.postImage(this.imageArr, this.fileId).then((data: any) => {
        console.log(data, 'fotoUpload');

        data.forEach((element, i) => {
          switch (i) {
            case 0:
              this.reportDetail.imageOne = element.fileDownloadUri;
              break;
            case 1:
              this.reportDetail.imageTwo = element.fileDownloadUri;
              break;
            case 2:
              this.reportDetail.imageThree = element.fileDownloadUri;
              break;
          }
        });

        this.uploadReport();
        this.back();
      });
    }
  }

  /* Fotograf Seçme */
  onFileChanged(event, index) {
    this.imageArr = [];
    if (index === 1) {
      this.selectedFileOne = event.target.files[0];
      //  this.editImage.one = index;
    }
    if (index === 2) {
      this.selectedFileTwo = event.target.files[0];
      //  this.editImage.two = index;
    }
    if (index === 3) {
      this.selectedFileThree = event.target.files[0];
      //   this.editImage.three = index;
    }
    this.imageArr.push({ imageOne: this.selectedFileOne, imageTwo: this.selectedFileTwo, imageThree: this.selectedFileThree });

  }

  updateMyDate($event, type) {
    let day, month, year;
    const date = new Date($event.value);
    day = date.getDate();
    if ((date.getMonth() + 1) < 10) {
      month = '0' + (date.getMonth() + 1);
    } else {
      month = (date.getMonth() + 1);
    }
    year = date.getFullYear();
    if (type === 1) {
      this.date = day + '/' + month + '/' + year;
      this.date = this.date.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '');
    } else {
      this.reportDate = day + '/' + month + '/' + year;
      this.reportDate = this.reportDate.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '');
      this.reportDetail.date = this.reportDate;
    }

  }

  back() {
    this.navCtrl.pop();
  }
}
