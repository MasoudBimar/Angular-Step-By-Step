import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortNumber',
  pure: true,
  standalone: true
})
export class SortNumberPipe implements PipeTransform {

  transform(values: number[], sortOrder: 'asc' | 'desc' = 'asc'): number[] {
    if (!values || values.length < 2) {
      return values ? [...values] : [];
    }
    return [...values].sort((a, b) => sortOrder === 'asc' ? a - b : b - a);

    // faster version
    // const sorted = [...values].sort((a, b) => a - b);
    // return sortOrder === 'desc' ? sorted.reverse() : sorted;
  }

}
