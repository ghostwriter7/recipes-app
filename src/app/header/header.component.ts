import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})

export class HeaderComponent {
    @Output() pageChanged = new EventEmitter<string>();
    currentPage: string;

    constructor() {
        this.currentPage = 'recipes';
    }

    onSelect(menuItem: string) {
        this.pageChanged.emit(menuItem);
        this.currentPage = menuItem;
    }
}