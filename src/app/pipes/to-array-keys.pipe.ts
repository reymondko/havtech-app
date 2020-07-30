import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArrayKeys'
})
export class ToArrayKeysPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
      return Object.keys(value).map(key => value[key])
  }
}
