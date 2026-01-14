import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianDate',
  standalone: true
})
export class PersianDatePipe implements PipeTransform {

  transform(date: Date, format: string = 'fa-IR'): any {
    return date.toLocaleDateString(format);
  }

}
