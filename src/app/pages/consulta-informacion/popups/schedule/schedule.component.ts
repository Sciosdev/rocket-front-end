import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  comentario: String;
  selectedDate: Date;
  today : Date;
  constructor(protected ref: NbDialogRef<ScheduleComponent>) { }

  ngOnInit(): void {
    this.selectedDate = new Date();
    this.selectedDate.setSeconds(0);

    this.today = new Date();
  }

  cancel() {
    this.ref.close();
  }

  submit(value: any) {
    this.ref.close(value);
  }
}
