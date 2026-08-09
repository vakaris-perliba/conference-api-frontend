import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: false,
})
export class DurationPipe implements PipeTransform {
  transform(value: string): string {
      const sign = value.startsWith('-') ? '-' : '';
      const time = sign ? value.slice(1) : value;
      const [head, minutes] = time.split(':');
      const [days, hours] = head.includes('.') ? head.split('.') : ['0', head];
      const h = Number(days) * 24 + Number(hours);
      const m = Number(minutes);

      if (h === 0) return `${sign}${m} min`;
      if (m === 0) return `${sign}${h} h`;
      return `${sign}${h} h ${m} min`;
    }
}
