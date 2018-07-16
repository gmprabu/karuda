import { Component, OnInit, ChangeDetectorRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonService } from '../../shared/common.service';


@Component({
    selector: 'karuda-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class JhiMainComponent implements OnInit,AfterViewChecked {

    activeSpinner: any;
    constructor(
        private titleService: Title,
        private router: Router,
        private api: CommonService,
        private cd: ChangeDetectorRef
    ) {

        this.api.overlay.subscribe(active => 
            this.toggleSpinner(active)); 
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'Karuda';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
    }
    ngAfterViewChecked() {
        this.cd.detectChanges();
     }
       toggleSpinner(active){
         this.activeSpinner = active;
         this.cd.detectChanges();
       }
}
