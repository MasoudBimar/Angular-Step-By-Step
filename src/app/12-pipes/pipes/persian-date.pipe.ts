import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianDate',
})
export class PersianDatePipe implements PipeTransform {

  transform(date: Date, format: string = 'fa-IR'): string {
    return date.toLocaleDateString(format);
  }

}
