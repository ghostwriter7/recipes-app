import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})

export class HeaderComponent {
  date: Date = new Date();

}
