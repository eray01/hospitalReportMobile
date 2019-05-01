import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(public reportService: ReportService,
    public commonService: CommonService,
    public router: Router,
    public storage: Storage) { }

  ngOnInit() { }
  login() {
    this.reportService.postLogin(this.username, this.password).then((data: any) => {
      if (!data.status && data.error) {
        return this.commonService.presentAlert('Hata', 'Kullanıcı adı veya şifre hatalı..')
      }
      console.log(data);
      this.storage.set('token',data.message);
      this.router.navigateByUrl('/home');
    });
  }
}
