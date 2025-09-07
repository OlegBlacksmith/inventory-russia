import { Component, EventEmitter, Output } from '@angular/core';
import { GratitudesService } from '../../../../../services/gratitudes.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-grat-adder',
  imports: [
    FormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './grat-adder.component.html',
  styleUrl: './grat-adder.component.css',
})
export class GratAdderComponent {
  isFileSelect: boolean = false;
  dragActive: boolean = false;
  selectedFiles: { file: File; customName: string }[] = [];

  successMess?: string;
  errorMess?: string;

  @Output() addNewGratitude = new EventEmitter<any>();

  constructor(private gratService: GratitudesService) {}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragActive = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragActive = false;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragActive = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.prepareFiles(files);
    }
  }

  sanitizeFileName(index: number): void {
    let name = this.selectedFiles[index].customName;
    name = name.replace(/[^a-zA-Z0-9-_]/g, '');
    this.selectedFiles[index].customName = name;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      this.prepareFiles(files);
    }
  }

  prepareFiles(files: FileList): void {
    this.isFileSelect = true;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
        this.selectedFiles.push({ file, customName: nameWithoutExt });
      }
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.isFileSelect = this.selectedFiles.length > 0;
  }

  async uploadAllFiles(): Promise<void> {
    const formData = new FormData();
    this.selectedFiles.forEach((item) => {
      const originalName = item.file.name;
      const ext = originalName
        .substring(originalName.lastIndexOf('.') + 1)
        .toLowerCase();
      const finalName = `${item.customName.trim()}.${ext}`;
      const renamedFile = new File([item.file], finalName, {
        type: item.file.type,
      });
      formData.append('files', renamedFile);
    });

    try {
      await this.gratService.uploadGratitudes(formData);
      this.successMess = 'Файлы успешно загружены';
      this.addNewGratitude.emit();
      setTimeout(() => (this.successMess = ''), 3000);
      this.selectedFiles = [];
      this.isFileSelect = false;
    } catch (err) {
      console.error('Error uploading gratitudes:', err);
      this.errorMess = 'Ошибка при загрузке файлов';
      setTimeout(() => (this.errorMess = ''), 3000);
    }
  }
}
