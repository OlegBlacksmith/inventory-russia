import { Component, OnInit, ViewChild } from '@angular/core';
import { LogoInfo } from '../../../../../shared/models/logo-info.model';
import { LogoService } from '../../../../../services/logo.service';
import { NgFor, NgIf } from '@angular/common';
import { LOGO_TYPE_NAMES } from '../../../../../shared/models/logo-type.model';
import { FormsModule } from '@angular/forms';
import { LogoAdderComponent } from '../logo-adder/logo-adder.component';

@Component({
  selector: 'app-logo-control',
  imports: [NgIf, NgFor, FormsModule, LogoAdderComponent],
  templateUrl: './logo-control.component.html',
  styleUrl: './logo-control.component.css',
})
export class LogoControlComponent implements OnInit {
  @ViewChild(LogoAdderComponent) logoAdder!: LogoAdderComponent;

  logos: LogoInfo[] = [];
  selectedItem: string | null = null;
  imageUrl: string | null = null;

  errorMess = '';
  successMess = '';

  constructor(private logoService: LogoService) {}

  async ngOnInit() {
    await this.loadLogos();
  }

  async loadLogos() {
    this.errorMess = '';
    this.successMess = '';
    try {
      this.logos = await this.logoService.getLogos();
    } catch {
      this.errorMess = 'Ошибка загрузки логотипов';
    }
  }

  selectItem(filename: string) {
    this.selectedItem = filename;
    const logo = this.logos.find((l) => l.filename === filename);
    this.imageUrl = logo ? logo.url : null;
    this.errorMess = '';
    this.successMess = '';
  }

  async deleteItem(filename: string) {
    if (!confirm(`Удалить логотип ${filename}?`)) return;
    try {
      await this.logoService.deleteLogo(filename);
      this.successMess = 'Логотип удалён';
      if (this.selectedItem === filename) {
        this.selectedItem = null;
        this.imageUrl = null;
      }
      await this.loadLogos();
    } catch {
      this.errorMess = 'Ошибка удаления логотипа';
    }
  }

  getLogoLabel(type: string): string {
    return LOGO_TYPE_NAMES[type] || type;
  }

  async onFilesSelected(formData: FormData) {
    this.errorMess = '';
    this.successMess = '';

    if (!formData) return;

    try {
      await this.logoService.uploadMultiple(formData);
      this.successMess = 'Все логотипы успешно загружены';
      await this.loadLogos();

      // Очищаем список файлов в аддере после успешной загрузки
      this.logoAdder.selectedFiles = [];
      this.logoAdder.isFileSelect = false;
    } catch {
      this.errorMess = 'Ошибка загрузки логотипов';
    }
  }
}
