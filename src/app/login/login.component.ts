import { Component, OnInit } from '@angular/core';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { GetApiService } from '../get-api.service'
import { DomSanitizer } from '@angular/platform-browser'
import axios from 'axios';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _sanitizer: DomSanitizer,
    private api: GetApiService
  ) { }
  imagePath: any
  capId: any
  data!: PostData;
  answer: any
  ngOnInit(): void {
    this.api.getCap().then((data: any) => {
      let res = data.data as getCap
      console.log(data);
      this.capId = res.id
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + res.item1);
    })
  }
  onSubmit() {
    axios.post('http://dk-reg.herokuapp.com/api/bot/reg/%7Bid%7D/%7Banswer%7D', this.data).then(res => {
      console.log(res.status);

    })
  }

}

interface PostData {
  FullName: string
  Group: string
  Email: string
  Phone: string

}

interface getCap {
  item1: string
  id: string
}