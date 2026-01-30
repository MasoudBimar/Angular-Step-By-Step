import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumOfNumbers',
  pure: false,
  standalone: true
})
export class SumOfNumbersPipe implements PipeTransform {

  transform(values: number[]): number {
    let sum: number = 0;
    for (const value of values) {
      sum += value;
    }
    return sum;
  }

}
