import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[cnpjMask]'
})
export class CnpjMaskDirective {

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    input.value = this.applyMask(value);
    this.control.control?.setValue(input.value);
  }

  private applyMask(value: string): string {
    const numbers = value.replace(/\D/g, '');
    let maskedValue = '';

    if (numbers.length <= 2) {
      maskedValue = numbers;
    } else if (numbers.length <= 5) {
      maskedValue = `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    } else if (numbers.length <= 8) {
      maskedValue = `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    } else if (numbers.length <= 12) {
      maskedValue = `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    } else {
      maskedValue = `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12)}`;
    }

    return maskedValue;
  }
}
