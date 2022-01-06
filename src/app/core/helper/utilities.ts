import { Pipe, PipeTransform } from '@angular/core';

export function truncateString(
  toTruncateString,
  maxLength = 30,
  shouldDynamicallyDecreaseContent = false
): string {
  if (toTruncateString && toTruncateString.length > maxLength) {
    const computedLength = (shouldDynamicallyDecreaseContent && screen.width < 450) ? 20 : maxLength;
    return `${toTruncateString.slice(0, computedLength)}...`;
  }
  return toTruncateString;
}

@Pipe({name: 'truncateText' })
export class TruncateTextPipe implements PipeTransform {
  transform(value: any, ...args): any {
    const maxLength = args[0] || 17;
    if (value && value.length > maxLength) {
      return `${value.slice(0, maxLength)}...`;
    }
    return value;
  }
}
