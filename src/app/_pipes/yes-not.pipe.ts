import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesnot'
})
export class YesNotPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Si' : 'No';
  }

}
