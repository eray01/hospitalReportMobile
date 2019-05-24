import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  userinfo = { username: '', password: '' };
  constructor(public reportService: ReportService,
              public commonService: CommonService,
              public router: Router,
              public storage: Storage,
              public navCtrl: NavController) {
    this.storage.get('checklogin').then(data => {
      console.log(data);
      if (data) {
      this.navCtrl.navigateRoot('/home');
      }
    });
    this.storage.get('userinfo').then(data => {
      this.userinfo.username = data.username;
      this.userinfo.password = data.password;
    });
  }

  ngOnInit() {
  }
  login() {
    this.reportService.postLogin(this.userinfo.username, this.userinfo.password).then((data: any) => {
      if (!data.status && data.error) {
        return this.commonService.presentAlert('Hata', 'Kullanıcı adı veya şifre hatalı..');
      }
      this.storage.set('userinfo', this.userinfo);
      this.storage.set('token', data.message);
      this.storage.set('checklogin', true);
      this.router.navigateByUrl('/home');
    });
  }
}
