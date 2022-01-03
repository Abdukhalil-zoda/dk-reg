import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetApiService } from '../get-api.service'
import { DomSanitizer } from '@angular/platform-browser'
import axios from 'axios';
import { User } from '../User';
import { DialogComponent } from '../dialog/dialog.component';


@Inject({

})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  constructor(
    private _sanitizer: DomSanitizer,
    private api: GetApiService,
    public dialog: MatDialog
  ) { }
  imagePath: any
  data: User = new User("", "", "", "");
  capId: string = ''
  answer: string = ''
  ngOnInit(): void {
    this.api.getCap().subscribe((data: any) => {
      let res = data as getCap
      this.capId = res.id
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + res.item1);
    })
    this.data = new User("", "", "", "");
  }
  refreshCap() {
    this.api.getCap().subscribe((data: any) => {
      let res = data as getCap
      this.capId = res.id
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + res.item1);
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '60%',
      data: {
        FullName: this.data.FullName,
        Group: this.data.Group,
        Email: this.data.Email,
        Phone: this.data.Phone,
      },
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  submit(user: User) {
    if (
      user.FullName == "" ||
      user.Group == "" ||
      user.Email == "" ||
      user.Phone == "" ||
      this.answer == ""
    ) {
      alert('all fill must be full')
      return;
    }
    let a = this.api.sendUser(user, this.capId, this.answer)
    a.subscribe(
      async (data) => {
        if (data.status == 200) {
          console.warn('done');
          this.openDialog()

        }

      },
      async (error) => {
        alert('captcha not solved correct')
        return;
      }
    )
    this.ngOnInit();
  }

}

interface getCap {
  item1: string
  id: string
}