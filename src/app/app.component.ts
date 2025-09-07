import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'инвентаризация';

  constructor(private metaService: Meta, private titleService: Title) {
    this.setMetaTags();
  }

  setMetaTags() {
    this.titleService.setTitle('Инвентаризация - компания проверенная временем!');
    this.metaService.addTags([
      { name: 'description', content: 'Компания проверенная временем!' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' }
    ]);
  }
}
