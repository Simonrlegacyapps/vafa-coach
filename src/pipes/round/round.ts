import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the RoundPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'round',
})
export class RoundPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
    transform(value: number): number {
        return Math.round(value);
    }

}
