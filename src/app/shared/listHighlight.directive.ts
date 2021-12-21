import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appListHighlight]'
})

export class AppListHighlight {
  @HostBinding('style.backgroundColor') bgColor: string = 'rgb(108,117,125) !important';
  @HostBinding('style.color') color: string = 'rgb(248, 249, 250) !important';

  @HostListener('mouseenter') onEnter() {
    this.bgColor = 'rgb(248,249,250) !important';
    this.color = 'rgb(108,117,125) !important';
  }

  @HostListener('mouseleave') onLeave() {
    this.bgColor = 'rgb(108,117,125) !important';
    this.color = 'rgb(248,249,250) !important';
  }
}
