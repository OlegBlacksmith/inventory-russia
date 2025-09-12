import { Component, OnInit } from '@angular/core';
import { BackButtonComponent } from '../../shared/components/buttons/back-button/back-button.component';
import { personalDataContent } from '../../shared/data/personal-data-content';
import { NgFor } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-personal-data',
  imports: [
    PageHeaderComponent,
    BackButtonComponent,
    NgFor
  ],
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.css'
})
export class PersonalDataComponent implements OnInit{
  contents = personalDataContent;

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
