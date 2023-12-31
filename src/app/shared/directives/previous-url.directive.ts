import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[appPreviousUrl]'
})
export class PreviousUrlDirective {
  @HostListener("click")
  onClick(){
    this.location.back()
  }
  constructor(private location:Location) { }

}
