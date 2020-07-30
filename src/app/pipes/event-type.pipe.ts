import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventType'
})
export class EventTypePipe implements PipeTransform {

transform(value: any, args: any[] = null): any {
  switch(value){
    case 1:
      return 'General Event'
      break;
    case 2:
      return 'Special Event'
      break;
    case 3:
      return 'Learning Institute'
      break;
    default:
      return 'N/A'
  }
}

}
