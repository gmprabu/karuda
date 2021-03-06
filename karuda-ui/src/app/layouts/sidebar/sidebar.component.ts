import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'karuda-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() NavClick = new EventEmitter<void>();
  onNavClick() {
    this.NavClick.emit();
  }

}
