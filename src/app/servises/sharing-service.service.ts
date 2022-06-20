import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingServiceService {

  constructor() { }
  private emailprofile :string | undefined;

save(email:string) {
    this.emailprofile = email;
}

fetch() {
    return this.emailprofile;
}
}
