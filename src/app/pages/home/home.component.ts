import { Component, OnInit } from '@angular/core';
import { DummyService } from '../services/dummy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _dummyservice: DummyService) { }

  ngOnInit(): void {
  }

  user:any;
  traeUsuario(){

    this._dummyservice.obtieneUsuario().subscribe( function(response) {

      this.user = response;
    })
  }
}
