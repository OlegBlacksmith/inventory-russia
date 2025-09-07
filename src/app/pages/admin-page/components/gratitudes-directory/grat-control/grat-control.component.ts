import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GratitudesService } from '../../../../../services/gratitudes.service';
import { LogService } from '../../../../../services/log.service';
import LogData from '../../../../../shared/models/log-data.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { GratAdderComponent } from '../grat-adder/grat-adder.component';

@Component({
  selector: 'app-grat-control',
  imports: [
    NgIf,
    NgFor,
    GratAdderComponent,
    DatePipe
  ],
  templateUrl: './grat-control.component.html',
  styleUrl: './grat-control.component.css',
})
export class GratControlComponent implements OnInit {
  gratitudesList: string[] = [];
  uploadLogs: Record<string, string> = {};
  private currentObjectUrl: string | null = null;
  selectedItem: string | null = null;
  fileUrl: any = null;

  constructor(
    private sanitizer: DomSanitizer,
    private gratService: GratitudesService,
    private logService: LogService
  ) {}

  async getGratitudes(): Promise<string[]> {
    try {
      return await this.gratService.getGratitudesList();
    } catch (err: unknown) {
      console.error('Error while retrieving gratitudes:', err);
      throw err;
    }
  }

  async getGratitudeByName(fileName: string | null): Promise<void> {
    if (!fileName) {
      this.fileUrl = null;
      return;
    }

    try {
      const blob = await this.gratService.getGratitudeByName(fileName);
      if (blob) {
        if (this.currentObjectUrl) {
          URL.revokeObjectURL(this.currentObjectUrl);
        }

        const objectUrl = URL.createObjectURL(blob);
        this.currentObjectUrl = objectUrl;
        this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      }
    } catch (err: unknown) {
      console.error('Error while retrieving gratitude file:', err);
      this.fileUrl = null;
    }
  }

  deleteItem(fileName: string): void {
    if (!fileName) return;
    this.gratService
      .deleteGratitudeByName(fileName)
      .then(() => {
        this.gratitudesList = this.gratitudesList.filter(
          (url) => !url.endsWith(fileName)
        );
        if (this.selectedItem === fileName) {
          this.selectedItem = null;
          this.fileUrl = null;
        }
      })
      .catch((err: unknown) => {
        console.error('Error while deleting gratitude file:', err);
      });
  }

  async onAddNewGratitude(): Promise<void> {
    const result = await this.getGratitudes();
    if (result) {
      this.gratitudesList = result;
      await this.loadUploadLogs();
    }
  }

  async ngOnInit(): Promise<void> {
    const result = await this.getGratitudes();
    if (result) {
      this.gratitudesList = result;
      await this.loadUploadLogs();
    }
  }

  async loadUploadLogs(): Promise<void> {
    for (const url of this.gratitudesList) {
      const fileName = url.split('/').pop();
      if (!fileName) continue;

      try {
        const log: LogData | null = await this.logService.getLogByFileName(
          fileName
        );
        if (log?.infoType === 'uploadGratitude') {
          this.uploadLogs[fileName] = new Date(log.timeStamp).toLocaleString();
        } else {
          this.uploadLogs[fileName] = '—';
        }
      } catch {
        this.uploadLogs[fileName] = '—';
      }
    }
  }

  async selectItem(url: string): Promise<void> {
    const fileName = url.split('/').pop() || null;
    this.selectedItem = fileName;
    await this.getGratitudeByName(this.selectedItem);
  }
}
