import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { Meta, Title } from '@angular/platform-browser';
import { OrderDialogComponent } from './shared/components/dialogs/order-dialog/order-dialog.component';
import { CareerDialogComponent } from './shared/components/dialogs/career-dialog/career-dialog.component';
import { CoockieBubbleComponent } from './shared/components/coockie-bubble/coockie-bubble.component';
import { FabMenuComponent } from "./shared/components/fab-menu/fab-menu.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    OrderDialogComponent,
    CareerDialogComponent,
    CoockieBubbleComponent,
    FabMenuComponent
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
