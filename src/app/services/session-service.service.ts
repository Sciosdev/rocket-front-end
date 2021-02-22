import { Injectable } from '@angular/core';
import { Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  constructor() { }

  public sessionWarningTimer$ = new Subject();
  setSessionTimeout() {
    let sessionWarningMinutes = 2;

    timer(sessionWarningMinutes * 60 * 1000).subscribe(this.sessionWarningTimer$);
  }
}
