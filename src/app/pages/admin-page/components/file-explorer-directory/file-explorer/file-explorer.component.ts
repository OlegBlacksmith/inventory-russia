import { Component, OnInit } from '@angular/core';
import CompanyInfo from '../../../../../shared/models/company-info.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { CompanyInfoService } from '../../../../../services/company-info.service';
import Details from '../../../../../shared/models/details.model';
import { FIELD_LABELS } from '../../../../../shared/models/field-labels.model';
import { RedactorComponent } from '../redactor/redactor.component';
import { LogService } from '../../../../../services/log.service';

@Component({
  selector: 'app-file-explorer',
  imports: [NgFor, NgIf, RedactorComponent, DatePipe],
  templateUrl: './file-explorer.component.html',
  styleUrl: './file-explorer.component.css',
})
export class FileExplorerComponent implements OnInit {
  payload: CompanyInfo | Details | undefined;
  selectedItem: any;
  isRedactorVisible: boolean = false;
  successMess?: string;
  errorMess?: string;

  items = [
    {
      title: 'Информация о компании',
      key: 'company-info',
      updatedAt: '',
    },
    {
      title: 'Реквизиты',
      key: 'details',
      updatedAt: '',
    },
  ];

  private readonly logTypeMap: Record<string, string> = {
    'company-info': 'updateCompanyInfo',
    'details': 'updateDetails',
  };

  constructor(
    private companyInfoService: CompanyInfoService,
    private logService: LogService
  ) {}

  async ngOnInit(): Promise<void> {
    // при старте подгружаем updatedAt для всех айтемов
    await Promise.all(
      this.items.map(async (item) => {
        const log = await this.logService.getLogByType(this.logTypeMap[item.key]);
        item.updatedAt = log?.timeStamp
          ? new Date(log.timeStamp).toLocaleString()
          : '—';
      })
    );
  }

  showRedactor() {
    this.isRedactorVisible = true;
  }

  getLabel(key: string): string {
    return FIELD_LABELS[key] || key;
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  getValue(obj: any, key: string): any {
    return obj[key];
  }

  async loadInfo(item: any): Promise<void> {
    this.selectedItem = item;

    if (item.key === 'company-info') {
      this.payload = await this.companyInfoService.getCompanyInfo();
    } else if (item.key === 'details') {
      this.payload = await this.companyInfoService.getDetails();
    }
  }

  async onCompanyInfoChanged(updatedData: any): Promise<void> {
    if (this.selectedItem.key === 'company-info') {
      await this.tryUpdate(
        () => this.companyInfoService.updateCompanyInfo(updatedData),
        updatedData,
        'company-info'
      );
    } else if (this.selectedItem.key === 'details') {
      await this.tryUpdate(
        () => this.companyInfoService.updateDetails(updatedData),
        updatedData,
        'details'
      );
    }
  }

  private async tryUpdate(
    updateFn: () => Promise<void>,
    updatedData: any,
    itemKey: string
  ): Promise<void> {
    try {
      await updateFn();
      this.successMess = 'Изменения успешно сохранены';
      this.payload = updatedData;

      const log = await this.logService.getLogByType(this.logTypeMap[itemKey]);
      const item = this.items.find((i) => i.key === itemKey);
      if (item && log?.timeStamp) {
        item.updatedAt = new Date(log.timeStamp).toLocaleString();
      }

      setTimeout(() => (this.successMess = ''), 3000);
    } catch (error) {
      this.errorMess = 'Ошибка при сохранении данных';
      console.error(error);
      setTimeout(() => (this.errorMess = ''), 3000);
    }
  }
}
