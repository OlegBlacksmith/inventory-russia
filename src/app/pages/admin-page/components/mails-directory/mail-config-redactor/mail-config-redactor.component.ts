import { Component, OnInit } from '@angular/core';
import { MailConfig } from '../../../../../shared/models/mail-config.model';
import { MailConfigService } from '../../../../../services/mail-config.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-mail-config-redactor',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './mail-config-redactor.component.html',
  styleUrl: './mail-config-redactor.component.css'
})
export class MailConfigRedactorComponent implements OnInit {
  showOrdersPass: boolean = false;
  showVacancyPass: boolean = false;

  config: MailConfig = {
    orders: { user: '', pass: '' },
    vacancy: { user: '', pass: '' }
  };

  loading = false;
  message = '';
  error = '';

  constructor(private mailConfigService: MailConfigService) {}

  async ngOnInit() {
    await this.loadConfig();
  }

  async loadConfig() {
    this.loading = true;
    try {
      this.config = await this.mailConfigService.getConfig();
    } catch (err) {
      console.error(err);
      this.error = 'Не удалось загрузить конфиг почт';
    } finally {
      this.loading = false;
    }
  }

  async save(type: 'orders' | 'vacancy') {
    const { user, pass } = this.config[type];
    try {
      await this.mailConfigService.updateConfig(type, user, pass);
      this.message = `Настройки для "${type}" обновлены`;
      setTimeout(() => (this.message = ''), 3000);
    } catch (err) {
      console.error(err);
      this.error = `Ошибка при обновлении "${type}"`;
      setTimeout(() => (this.error = ''), 3000);
    }
  }
}
