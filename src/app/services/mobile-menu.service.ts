import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileMenuService {

  private menuOpen$ = new BehaviorSubject<boolean>(false);

  isOpen$ = this.menuOpen$.asObservable();

  toggle() {
    const next = !this.menuOpen$.value;
    this.menuOpen$.next(next);
    document.body.style.overflow = next ? 'hidden' : '';
  }

  close() {
    this.menuOpen$.next(false);
    document.body.style.overflow = '';
  }
}
