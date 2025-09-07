import { Component, EventEmitter, Output } from '@angular/core';
import { SelectedFile } from '../../../../../shared/models/selected-file.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logo-adder',
  imports: [
    NgIf,
    NgFor,
    FormsModule,

  ],
  templateUrl: './logo-adder.component.html',
  styleUrl: './logo-adder.component.css'
})
export class LogoAdderComponent {
  isFileSelect = false;
  dragActive = false;
  selectedFiles: SelectedFile[] = [];

  @Output() filesSelected = new EventEmitter<FormData>();

  sanitizeFileName(index: number) {
    let name = this.selectedFiles[index].customName;
    name = name.replace(/[^a-zA-Z0-9-_]/g, '');
    this.selectedFiles[index].customName = name;
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.isFileSelect = this.selectedFiles.length > 0;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.prepareFiles(input.files);
      input.value = '';
    }
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragActive = false;
    if (event.dataTransfer?.files.length) {
      this.prepareFiles(event.dataTransfer.files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragActive = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragActive = false;
  }

  prepareFiles(files: FileList) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file) continue;

      // Фильтр по типу и размеру
      const isPng = file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');
      if (!isPng) {
        alert(`Файл ${file.name} пропущен — разрешены только PNG.`);
        continue;
      }
      if (file.size > maxSize) {
        alert(`Файл ${file.name} пропущен — размер не должен превышать 5MB.`);
        continue;
      }

      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
      this.selectedFiles.push({ file, customName: nameWithoutExt });
    }
    this.isFileSelect = this.selectedFiles.length > 0;
  }

  async uploadAllFiles() {
    if (this.selectedFiles.length === 0) return;

    const formData = new FormData();

    this.selectedFiles.forEach((item) => {
      // Жёстко ставим расширение png
      const finalName = `${item.customName.trim()}.png`;

      // Создаём новый файл с нужным именем и типом
      const renamedFile = new File([item.file], finalName, { type: 'image/png' });
      formData.append('files', renamedFile);
    });

    this.filesSelected.emit(formData);

    // Очистка списка — делаем после успешной загрузки в родителе
  }
}
