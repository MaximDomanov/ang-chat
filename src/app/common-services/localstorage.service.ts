import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  
  getArrayFromJson<T>(name: string): T[] {
    let items: T[];

    try {
      items = JSON.parse(localStorage.getItem(name));
    } catch (e) {
      items = [];
    }

    if (!Array.isArray(items)) {
      items = [];
    }

    return items;
  }
}
