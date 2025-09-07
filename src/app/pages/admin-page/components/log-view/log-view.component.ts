import { Component, OnInit } from '@angular/core';
import LogData from '../../../../shared/models/log-data.model';
import { JsonPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { DATA_TYPE } from '../../../../shared/models/data-type.model';
import { LogService } from '../../../../services/log.service';

@Component({
  selector: 'app-log-view',
  imports: [
    NgFor,
    NgIf,
  ],
  templateUrl: './log-view.component.html',
  styleUrl: './log-view.component.css'
})
export class LogViewComponent implements OnInit {
  logs: LogData[] | undefined;

  constructor(private logService: LogService) {}

  async ngOnInit(): Promise<void> {
    await this.getLogs();
  }

  async getLogs(): Promise<void> {
    try {
      this.logs = await this.logService.getAllLogs();
    } catch (err: unknown) {
      console.error('Error loading logs:', err);
    }
  }

  getDataDictionary(value: string): string {
    return DATA_TYPE[value] || value;
  }

  formatDateRu(dateStr: string): string {
    const date = new Date(dateStr);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // месяц с 0
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  hasFileNames(item: LogData): boolean {
    return Array.isArray(item.fileNames) && item.fileNames.length > 0;
  }
}
