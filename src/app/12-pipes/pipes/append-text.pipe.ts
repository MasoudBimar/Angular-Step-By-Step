import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appendText',
  standalone: true
})
export class AppendTextPipe implements PipeTransform {

  transform(value: string, suffixVal: string): string {
    return value.concat(' ' + suffixVal);
  }

}
