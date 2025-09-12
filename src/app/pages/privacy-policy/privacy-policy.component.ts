import { Component, OnInit } from '@angular/core';
import { BackButtonComponent } from '../../shared/components/buttons/back-button/back-button.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { privacyPolicyContent } from '../../shared/data/privacy-policy-content';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-privacy-policy',
  imports: [
    BackButtonComponent,
    PageHeaderComponent,
    NgFor
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent implements OnInit{
  contents = privacyPolicyContent;

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
