import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
      CommonModule
      , RouterLink
      , RouterLinkActive
      , NgbTooltipModule
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  apiServerStatus: Boolean = true;
  dbServerStatus: Boolean = false;
  isLogin: Boolean = false;

}
