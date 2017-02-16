import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";
/**
 * Created by nitish on 1/2/17.
 */

@Injectable()
export class Authentication implements CanActivate{

  constructor(private loginService:LoginService,private router:Router){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {

    console.log("Route value is "+route);
    console.log("Value of user logged in is "+LoginService.getIsUserLoggedIn());
    if(LoginService.getIsUserLoggedIn()){
      return true;
    }
    else{
      this.router.navigate(['login']);
      return false;
    }
  }

}
