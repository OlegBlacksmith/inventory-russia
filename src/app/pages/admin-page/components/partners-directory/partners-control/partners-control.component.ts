import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PartnersService } from '../../../../../services/partners.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AdderComponent } from '../adder/adder.component';
import { LogService } from '../../../../../services/log.service';

@Component({
  selector: 'app-partners-control',
  imports: [NgFor, NgIf, AdderComponent, DatePipe],
  templateUrl: './partners-control.component.html',
  styleUrl: './partners-control.component.css',
})
export class PartnersControlComponent implements OnInit {
  partnerPics: string[] = [];
  uploadLogs: Record<string, string> = {};
  selectedItem: string | null = null;
  imageUrl: any = null;
  private currentObjectUrl: string | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private partService: PartnersService,
    private logService: LogService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadPartnerPics();
  }

  async loadPartnerPics(): Promise<void> {
    try {
      const urls = await this.partService.getPartnerPicsList();
      this.partnerPics = urls;
      await this.loadUploadLogs();
    } catch (err) {
      console.error('Error loading partner pictures', err);
    }
  }

  async loadUploadLogs(): Promise<void> {
    for (const url of this.partnerPics) {
      const fileName = this.getFileName(url);
      try {
        const log = await this.logService.getLogByFileName(fileName);
        this.uploadLogs[fileName] =
          log?.infoType === 'uploadPartner' ? new Date(log.timeStamp).toLocaleString() : '—';
      } catch {
        this.uploadLogs[fileName] = '—';
      }
    }
  }

  getFileName(url: string): string {
    return url.split('/').pop()!;
  }

  async selectItem(url: string): Promise<void> {
    this.selectedItem = this.getFileName(url);
    await this.loadImage(this.selectedItem);
  }

  async loadImage(fileName: string | null) {
    if (!fileName) {
      this.imageUrl = null;
      return;
    }
    try {
      const blob = await this.partService.getPartnerByName(fileName);
      if (this.currentObjectUrl) {
        URL.revokeObjectURL(this.currentObjectUrl);
      }
      const objectUrl = URL.createObjectURL(blob);
      this.currentObjectUrl = objectUrl;
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    } catch (err) {
      console.error('Error loading image', err);
      this.imageUrl = null;
    }
  }

  async deleteItem(fileName: string): Promise<void> {
    try {
      await this.partService.deletePartnerByName(fileName);
      this.partnerPics = this.partnerPics.filter((url) => !url.endsWith(fileName));
      if (this.selectedItem === fileName) {
        this.selectedItem = null;
        this.imageUrl = null;
      }
      await this.saveOrder();
    } catch (err) {
      console.error('Error deleting item', err);
    }
  }

  getPosition(url: string): number {
    return this.partnerPics.indexOf(url) + 1;
  }

  async onPositionChange(url: string, newVal: string): Promise<void> {
    let newPos = parseInt(newVal, 10);
    if (isNaN(newPos)) return;

    newPos = Math.min(Math.max(1, newPos), this.partnerPics.length);

    const currentIndex = this.partnerPics.indexOf(url);
    if (currentIndex === -1) return;

    this.partnerPics.splice(currentIndex, 1);
    this.partnerPics.splice(newPos - 1, 0, url);

    await this.saveOrder();
  }

  async saveOrder(): Promise<void> {
    const order = this.partnerPics
      .map((url) => this.getFileName(url))
      .filter(Boolean);

    try {
      await this.partService.updatePartnerOrder(order);
      console.log('Order saved');
    } catch (err) {
      console.error('Error saving order', err);
    }
  }

  async onAddNewPartner(): Promise<void> {
    await this.loadPartnerPics();
  }
}
