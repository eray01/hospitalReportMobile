import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  token: string;
  constructor(public storage: Storage) {
    this.storage.get('token').then(val => {
      console.log(val, 'token');
    })
  }
}
