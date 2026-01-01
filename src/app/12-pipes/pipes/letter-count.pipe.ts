import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'letterCount'
})
export class LetterCountPipe implements PipeTransform {

  transform(value: string): number {
    if (!value)
      return 0;

    // Unicode letter matching
    const matches = value.match(/\p{L}/gu);
    return matches ? matches.length : 0;
  }

}
