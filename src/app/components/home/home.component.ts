import { Component, OnInit, afterRender, afterNextRender, AfterRenderPhase } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BreadcrumbComponent } from '../../_shared/breadcrumb/breadcrumb.component';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, BreadcrumbComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: { class: 'flex-grow-1 d-flex flex-column' }
})
export class HomeComponent implements OnInit{

  currentRoute = '' // 當前網址
  isHome = true // 是否為首頁
  userData: {label: string, value: any} | undefined;

  constructor(
    protected spinner: NgxSpinnerService
  ) {
    // 元件 Dom 完成(不含 CSS)後執行(只執行一次)
    afterNextRender(async () => {
      console.log('afterNextRender');
    }, {phase: AfterRenderPhase.Read});

    // 元件 Dom 完成(不含 CSS)後執行，包含離開元件時亦執行
    afterRender(async () => {
      console.log('afterRender');
    }, {phase: AfterRenderPhase.Read});
  }

  ngOnInit() {
  }

  initProcess() {
  }

}
