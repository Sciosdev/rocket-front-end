import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SessionServiceService } from './services/session-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})


export class AppComponent {
  title = 'rocket-front-end';

  private destroyed$ = new Subject();

  constructor(private sessionServiceService:SessionServiceService){

  }

ngOnInit() {
    this
        .sessionServiceService
        .sessionWarningTimer$
        .subscribe(() => this.displaySessionWarning());
}

ngOnDestroy() {
    this.destroyed$.next();
}

displaySessionWarning() {
    alert("Sesion expirada");
}
}
