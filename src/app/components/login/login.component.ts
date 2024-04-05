import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../_shared/breadcrumb/breadcrumb.component";
import { LoginForm } from './view-models';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BreadcrumbComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: { class: 'flex-grow-1 d-flex flex-column' }
})
export class LoginComponent implements OnInit {

  form: LoginForm | undefined = new LoginForm();

  constructor(
    protected spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.initProcess();
  }

  // 初始化元件變數
  initProcess() {
    this.form = new LoginForm();
  }

  // 登入
  async loginFn () {

    this.formValidationFn();
    await this.spinner.show();



  }

  // 前端登入資料驗證
  async formValidationFn () {
    let result = true;

    // 帳號是否為空
    if (!this.form?.account) {
      result = false;
    }

    // 密碼是否為空
    if (!this.form?.password) {
      result = false;
    }

    if (!result) {
      await Swal.fire({
        heightAuto: false,
        icon: 'error',
        title: '登入失敗',
        text: '帳號或密碼錯誤，請確認後再試一次。'
      });
    }

    return result;
  }

}
