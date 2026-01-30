import { Component, HostBinding, HostListener } from '@angular/core';


@Component({
    imports: [],
    selector: 'app-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {
  @HostBinding('style.backgroundColor') selectedColor!: string;
  @HostListener('input', ['$event']) onColorChange(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (!target) return;
    this.selectedColor = target.value;
  }

  colorChange(event: Event) {
    const value = (event.target as HTMLInputElement | null)?.value;
    if (value) this.selectedColor = value;
  }
}
