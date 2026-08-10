import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: false,
})
export class DurationPipe implements PipeTransform {
  transform(value: string): string {
    const [hours, minutes] = value.split(':');
    const h = Number(hours);
    const m = Number(minutes);

    if (h === 0) return `${m} min`;
    if (m === 0) return `${h} h`;
    return `${h} h ${m} min`;
  }
}
