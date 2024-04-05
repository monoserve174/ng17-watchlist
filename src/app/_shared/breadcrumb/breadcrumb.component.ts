import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

    breadcrumbList: any[] = [];

    constructor(
      private activatedRoute: ActivatedRoute
    ) {

      this.breadcrumbList = this.activatedRoute.snapshot.url.map((curPart: any) => curPart.path);
      if (this.breadcrumbList.length === 1) {
        this.breadcrumbList = ["home", ...this.breadcrumbList];
      }

    }
}
