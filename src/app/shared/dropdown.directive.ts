import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{
  @Input() dropDownId!: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.renderer.listen(window, 'click', (e) => {
      if (e.target.id === this.dropDownId) {

        if (this.elementRef.nativeElement.childNodes[0].classList.contains('show')) {
          this.removeShow();

        } else {
          this.elementRef.nativeElement.childNodes.forEach((child: HTMLElement ) => {
            child.classList.add('show');
          })
        }
      } else {
        this.removeShow();
      }
    })
  }

  removeShow() {
    this.elementRef.nativeElement.childNodes.forEach((child: HTMLElement ) => {
      child.classList.remove('show');
    })
  }
}
