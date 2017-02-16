/**
 * Created by nitish on 29/1/17.
 */


import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {User} from "./user.class";
@Injectable()
export class LoginService {

  public user:User;
  public response:any;
  private loginUrl="http://www.mistu.org/etutor/login.php/";
  private static userLoggedIn:boolean=true;

  constructor(private _http:Http) { }
  attemptLogin(loginInfo:any):Observable<User>{
    console.log("User data inside service: "+JSON.stringify(loginInfo));
    let headers = new Headers();
    headers.append('Content-Type',
      'application/json');

    return this._http.post(this.loginUrl,JSON.stringify(loginInfo),headers)
      .map((response:Response)=><User> response.json())
      .do(data=>console.log("Login Response"+JSON.stringify(data)));


    // console.log("Inside login service "+ JSON.stringify(this.response))
    // if(this.response['isVerified']==1) {
    //   this.userLoggedIn = true;
    // }
    // return this.response;

  }

  public static resetIsUserLoggedIn(){
    this.userLoggedIn=false;
  }

  getUserCredentails():User{
    return this.user;
  }

  setUserCredentails(user:User){
    this.user=user;
  }

  public static getIsUserLoggedIn(){
    return this.userLoggedIn;
  }

  public static setIsUserLoggedIn(){
    this.userLoggedIn=true;
  }
}
