import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'karuda-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>();
  public navTitle: string;

  constructor(
    private router: Router,private commonService: CommonService,private authservice:AuthService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
            this.navTitle = this.getPageTitle(this.router.routerState.snapshot.root);
        }
    });
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'Karuda';
    if (routeSnapshot.firstChild) {
        title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  openSidebar() {
    this.toggle.emit();
  }

  loggedIn(){
    return this.authservice.isLoggedIn();
  }
}
