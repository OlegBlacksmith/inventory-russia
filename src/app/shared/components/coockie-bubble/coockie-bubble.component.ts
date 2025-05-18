import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coockie-bubble',
  imports: [
    NgIf
  ],
  templateUrl: './coockie-bubble.component.html',
  styleUrl: './coockie-bubble.component.scss'
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
