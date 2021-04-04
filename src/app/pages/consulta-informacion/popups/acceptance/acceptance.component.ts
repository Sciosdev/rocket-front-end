import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-acceptance',
  templateUrl: './acceptance.component.html',
  styleUrls: ['./acceptance.component.scss']
})
export class AcceptanceComponent implements OnInit {

  constructor(protected ref: NbDialogRef<AcceptanceComponent>) { }

  ngOnInit(): void {
  }

  accept() {
    this.ref.close(true);
  }

  cancel() {
    this.ref.close(false);
  }

}
