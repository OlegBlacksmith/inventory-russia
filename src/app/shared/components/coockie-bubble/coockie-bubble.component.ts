import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coockie-bubble',
  imports: [NgIf, RouterLink],
  templateUrl: './coockie-bubble.component.html',
  styleUrl: './coockie-bubble.component.css',
})
export class CoockieBubbleComponent implements OnInit {
  isBubbleVisible?: boolean;
  readonly consentKey = 'cookieConsentChoice';

  ngOnInit() {
    const consent = localStorage.getItem(this.consentKey);
    this.isBubbleVisible = !consent;

    if (this.isBubbleVisible) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeBubble() {
    this.isBubbleVisible = false;
    document.body.style.overflow = '';
    localStorage.setItem(this.consentKey, 'accepted');
  }
}
