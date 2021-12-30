import { Injectable } from '@angular/core';
import axios, { Axios } from 'axios';

@Injectable({
  providedIn: 'root'
})


export class GetApiService {
  constructor(
  ) { }

  getCap() {
    let response = axios.get("http://dk-reg.herokuapp.com/api/bot/cap")

    return response
  }
}
