import { Component } from '@angular/core';
import { BackButtonComponent } from '../../shared/components/buttons/back-button/back-button.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { privacyPolicyContent } from '../../shared/data/privacy-policy-content';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  imports: [
    BackButtonComponent,
    PageHeaderComponent,
    NgFor
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  contents = privacyPolicyContent;
}
