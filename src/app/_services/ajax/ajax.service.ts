import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { apiUrl, restfulMethod, storageType } from '../../_shared/global-variables';
import { StorageService } from '../storage/storage.service';
import { lastValueFrom } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  httpOptions = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  // API 請求處理
  async helper(method: string = restfulMethod.GET, urlParam: string[] = [], otherParam: any = {}, data: any = {},
               withAuth: boolean = false, isAlert: boolean = false) {
    // API 請求處理
    // method: 請求方法 GET, POST, PUT, DELETE，預設 GET，參考 src/app/_shared/global-variables.ts 的 restfulMethod
    // urlParam: URL 參數，預設空陣列 http://xxx.xxx.xxx/[urlParam[0]]/[urlParam[1]]...
    // otherParam: 其他參數，預設空物件 /?key1=value1&key2=value2...
    // data: 請求資料，預設空物件，POST, PUT 使用
    // withAuth: 是否需要驗證，預設 false
    // isAlert: 是否需要錯誤訊息，預設 false

    if (withAuth) { this.setupAuthHeader(); }
    const restfulUrl = this.urlProcess(urlParam, otherParam);

    let apiResult;

    switch (method) {
      case restfulMethod.GET:
        apiResult = await lastValueFrom(this.http.get(restfulUrl, { headers: this.httpOptions }).pipe(
          catchError(async (error) => this.errorProcess(error, isAlert))
        ));
        break;
      case restfulMethod.POST:
        apiResult = await lastValueFrom(this.http.post(restfulUrl, data, { headers: this.httpOptions }).pipe(
          catchError(async (error) => this.errorProcess(error, isAlert))
        ));
        break;
      case restfulMethod.PUT:
        apiResult = await lastValueFrom(this.http.put(restfulUrl, data, { headers: this.httpOptions }).pipe(
          catchError(async (error) => this.errorProcess(error, isAlert))
        ));
        break;
      case restfulMethod.DELETE:
        apiResult = await lastValueFrom(this.http.delete(restfulUrl, { headers: this.httpOptions }).pipe(
          catchError(async (error) => this.errorProcess(error, isAlert))
        ));
        break;
      default:
        apiResult = await lastValueFrom(this.http.get(restfulUrl, { headers: this.httpOptions }).pipe(
          catchError(async (error) => this.errorProcess(error, isAlert))
        ));
        break;
    }

    return this.apiResultProcess(apiResult);

  }

  // URL 組成處理
  urlProcess(urlParam: string[] = [], otherParam: any = {}) {
    // URL 組成處理 http://xxx.xxx.xxx/[urlParam[0]]/[urlParam[1]].../?key1=value1&key2=value2...
    // urlParam: URL 參數，預設空陣列 http://xxx.xxx.xxx/[urlParam[0]]/[urlParam[1]]...
    // otherParam: 其他參數，預設空物件 /?key1=value1&key2=value2...
    let result = apiUrl;

    if (urlParam.length > 0) {
      result += urlParam.join('/');
      result += '/'; // URL 參數結尾加上斜線
    }

    if (Object.keys(otherParam).length > 0) {
      result += '?' + Object.keys(otherParam).map(key => key + '=' + otherParam[key]).join('&');
    }

    return result;
  }

  // 設定帶有驗證的 Header
  setupAuthHeader() {
    // 設定帶有驗證的 Header
    // TODO 驗證放置方式
    const userInfo = this.storage.getStorage(storageType.local, 'userInfo');

    this.httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
      // , 'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }

  apiResultProcess(apiResult: any) {
    // API 回應返回
    const resultType = apiResult?.type || undefined;

    switch (resultType) {
      case undefined:
      case 'json':
        return apiResult

      case 'file':
        const fileName = apiResult?.data?.fileName || 'attachment';
        const mimeType = apiResult?.data?.mimeType || 'application/octet-stream';
        const data = apiResult?.data?.file;

        this.downloadFile(fileName, mimeType, data);
    }
  }

  // 下載檔案
  downloadFile(fileName: string, mimeType: string = 'application/octet-stream', data: Blob) {
    // TODO 下載檔案，確認 Blob 是否需要分割
    // fileName: 檔案名稱
    // mimeType: 檔案類型，預設 application/octet-stream
    // data: Blob 資料

    const blobData = new Blob([data], { type: mimeType });
    const blobUrl = window.URL.createObjectURL(blobData);
    window.open(blobUrl, '_blank', `filename=${fileName}`);
    window.URL.revokeObjectURL(blobUrl);
  }

  // 錯誤處理
  errorProcess(error: any, isAlert: boolean = false) {
    // 錯誤處理
    // error: 錯誤訊息
    let errorMessage: string;
    if (error instanceof HttpErrorResponse) {
      // 錯誤代碼，請求網址，錯誤訊息組成
      errorMessage = `錯誤代碼: ${error.status}\n錯誤訊息: ${error.message}\n請求網頁: ${error.url}`;
      console.log(errorMessage);
    } else {
      errorMessage = `錯誤訊息: ${error.message}`;
      console.log(errorMessage);
    }

    if (isAlert) {
      alert(errorMessage);
    }
  }

}
