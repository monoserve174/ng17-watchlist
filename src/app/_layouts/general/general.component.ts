import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../../_shared/header/header.component";
import { FooterComponent } from "../../_shared/footer/footer.component";
import { NgxSpinnerModule } from "ngx-spinner";

const UiComponents = [
  HeaderComponent,
  FooterComponent
];

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [RouterModule, CommonModule, UiComponents, NgxSpinnerModule],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent {

}
