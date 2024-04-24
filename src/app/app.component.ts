import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMenuExpanded: boolean = true;

  toggleMenu(): void {
    this.isMenuExpanded = !this.isMenuExpanded;
  }
}
