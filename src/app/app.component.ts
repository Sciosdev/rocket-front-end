import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})


export class AppComponent {
  title = 'rocket-front-end';

  private destroyed$ = new Subject();

  constructor(){

  }

ngOnInit() {
}

ngOnDestroy() {
    this.destroyed$.next();
}

}
