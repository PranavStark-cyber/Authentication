import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginandsignupService {

  constructor(private http:HttpClient) { }
  userurl:string = 'https://localhost:7109/api/User/'


  registeradd(adduser:User){
    return this.http.post(this.userurl+"add-user",adduser)
  }

  loginadd(loginuser:User){
    return this.http.post<User>(this.userurl+"login",loginuser)
  }
}


export interface User{
  fullName:string | null ;
  email:string;
  password:string;
  role:number | null;
}