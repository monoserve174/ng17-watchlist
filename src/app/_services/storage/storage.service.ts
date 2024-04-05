import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // 儲存資料
  setStorage(type: string, key: string, value: any) {
    // 儲存資料
    // type: 儲存類型 local 或 session, key: 索引名稱, value: 索引資料
    switch (type) {
      case 'local':
        localStorage.setItem(key, JSON.stringify(value));
        break;
      case 'session':
        sessionStorage.setItem(key, JSON.stringify(value));
        break;
      default:
        alert('請輸入正確的儲存類型 local 或 session');
    }
  }

  // 取得資料
  getStorage(type: string, key: string): any {
    // 取得資料
    // type: 儲存類型 local 或 session, key: 索引名稱
    let result = undefined;
    switch (type) {
      case 'local':
        result = localStorage.getItem(key);
        result = result ? JSON.parse(result) : undefined;
        break;
      case 'session':
        result = sessionStorage.getItem(key);
        result = result ? JSON.parse(result) : undefined;
        break;
      default:
        alert('請輸入正確的儲存類型 local 或 session');
    }
    return result;
  }
}
