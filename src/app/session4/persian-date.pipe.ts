import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianDate'
})
export class PersianDatePipe implements PipeTransform {

  transform(date: Date, format?: string, format2?: string): any {
      return date.toLocaleDateString(format);
  }

}
