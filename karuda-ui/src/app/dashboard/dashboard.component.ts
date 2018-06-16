import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'elb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor( private authService: AuthService) { }

  ngOnInit() {
  }

  logout(){
    alert('test');
    this.authService.logout();
  }
}
