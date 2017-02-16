/**
 * Created by nitish on 29/1/17.
 */
export  class LoginDetails
{
  constructor( public email:string,
  public password:string){

  }
}

export class User{
  constructor(public email:string,
              public fName:string,
              public lName:string,
              public isVerified:number
  ){

  }
}


