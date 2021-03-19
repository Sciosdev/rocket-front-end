import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  title: String;
  data: Date;
  constructor(protected ref: NbDialogRef<ScheduleComponent>) { }

  ngOnInit(): void {
    this.data = new Date();
    this.data.setSeconds(0);
    this.data.setHours(0);
    this.data.setMinutes(0);

  }

  cancel() {
    this.ref.close();
  }

  submit(value: Date) {
    this.ref.close(value);
  }
}
