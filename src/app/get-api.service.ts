import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from './User';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class GetApiService {
  constructor(
    private http: HttpClient
  ) { }

  getCap() {
    let response = this.http.get("http://dk-reg.herokuapp.com/api/bot/cap")

    return response
  }

  sendUser(user: User, id: string, answer: string) {
    const myHeaders = new HttpHeaders().set('Authorization', 'my-auth-token');



    return this.http.post(
      `http://dk-reg.herokuapp.com/api/bot/reg/${id}/${answer}`,
      user,
      { observe: 'response' }       /*headers: myHeaders, responseType: 'text'*/

    ).pipe()

  } 
}
