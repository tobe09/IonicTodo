import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DataApiProvider Provider');
  }

  getInfo(){    
    return this.http.get("http://localhost:8080/CompanyAPI/rest/company/getTest?name=john&address=adressJohn&type=typeJohn");
  }

}
