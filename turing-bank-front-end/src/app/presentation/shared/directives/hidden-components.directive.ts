import { Directive, Renderer, ElementRef, Input } from '@angular/core';
import { HiddenComponentsService } from './hidden-components.service';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Directive({
  selector: '[appHiddenComponents]'
})
export class HiddenComponentsDirective {

  @Input('appHiddenComponents') hiddenDisplay: boolean;
  BASE_DISPLAY: any;

  constructor(
    private _render: Renderer,
    private _el: ElementRef,
    private store: Store<{ display: boolean }>
  ) {

  }

  ngOnInit(): void {
    console.log('start')
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setDisplay();

    console.log('end');

  }


  setDisplay() {
    console.log('pedding');
    const el = this._el.nativeElement;

    console.log(this.hiddenDisplay, ' base');

    if (this.hiddenDisplay) {
      this._render.setElementStyle(el, 'display', 'none');
    }



    // console.log(this.BASE_DISPLAY, 'DISPLAY');

    // const el = this._el.nativeElement;
    // if (hidden) {
    //   this._render.setElementStyle(el, 'display', 'none');
    //   console.log(this._el.nativeElement, 'app');
    // };
  }

}
