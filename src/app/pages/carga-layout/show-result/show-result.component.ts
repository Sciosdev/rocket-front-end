import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { NbStepperComponent } from '@nebular/theme';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.scss']
})
export class ShowResultComponent implements OnInit, OnChanges {

  @Input() resultado: any;
  @Input() errores: any[];

  constructor(private stepper: NbStepperComponent) { }

  ngOnInit(): void {
  }
  
  finaliza(){
    this.stepper.reset();
  }
  
  ngOnChanges(): void {
    if (this.resultado != null  && this.errores != null) {
      return;
    }
  }
}
