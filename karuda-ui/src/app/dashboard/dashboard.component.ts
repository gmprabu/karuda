import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'elb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
   // throw new Error("Method not implemented.");
  }
  constructor( private auth: AuthService ) { }
  logout(){
    this.auth.logout();
  }
}
