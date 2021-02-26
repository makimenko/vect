import {MatButton} from '@angular/material/button';

export function btnClick(event: KeyboardEvent, buttonRef: MatButton): void {
  event.preventDefault();
  const button = buttonRef._getHostElement();
  if (!button.disabled) {
    button.click();
  }
}
