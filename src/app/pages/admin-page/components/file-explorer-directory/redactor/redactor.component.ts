import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FIELD_LABELS } from '../../../../../shared/models/field-labels.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-redactor',
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './redactor.component.html',
  styleUrl: './redactor.component.css',
})
export class RedactorComponent implements OnChanges {
  form!: FormGroup;

  @Input() selectedItem: any;
  @Input() isRedactorVisible?: boolean;
  @Input() payload: Record<string, any> | undefined;

  @Output() close = new EventEmitter<void>();
  @Output() companyInfoChanged = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['payload'] && this.payload) {
      this.initForm(this.payload);
    }
  }

  private initForm(data: Record<string, any>): void {
    const group: Record<string, FormControl<any>> = {};

    for (const key of Object.keys(data)) {
      group[key] = this.fb.control(data[key] ?? '');
    }

    this.form = this.fb.group(group);
  }

  getLabel(key: string): string {
    return FIELD_LABELS[key] || key;
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  onCloseClick(): void {
    this.close.emit();
  }

  async saveChanges(): Promise<void> {
    if (this.form?.valid) {
      this.companyInfoChanged.emit(this.form.getRawValue());
    }
  }
}
