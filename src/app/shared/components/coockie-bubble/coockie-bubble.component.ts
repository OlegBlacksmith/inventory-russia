import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coockie-bubble',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './coockie-bubble.component.html',
  styleUrl: './coockie-bubble.component.css'
})
export class CoockieBubbleComponent implements OnInit{
  isBubbleVisible?: boolean;

  ngOnInit(){
    this.isBubbleVisible = true;
    document.body.style.overflow = 'hidden';
  }

  closeBubble(){
    this.isBubbleVisible = false
    document.body.style.overflow = '';
  }
}
