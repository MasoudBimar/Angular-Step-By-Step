import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';


@Component({
  standalone: true,
  imports: [],
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements AfterViewInit {
  @ViewChild('colorInput') colorInput?: ElementRef<HTMLInputElement>;
  @HostBinding('style.backgroundColor') selectedColor!: string;
  @HostListener('input', ['$event']) onColorChange(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (!target) return;
    this.selectedColor = target.value;
  }

  ngAfterViewInit(): void {
    if (this.colorInput?.nativeElement) {
      this.selectedColor = this.colorInput.nativeElement.value;
    }
  }
}
