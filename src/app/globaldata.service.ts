import { Injectable } from '@angular/core';

interface ListingObj {
  [id: string]: any;
}

@Injectable()
export class GlobaldataService {

  ListingObj: ListingObj = {};

}
