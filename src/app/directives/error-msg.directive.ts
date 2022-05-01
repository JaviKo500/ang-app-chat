import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[error-msg]'
})
export class ErrorMsgDirective {

  private _message: string = 'Requiered field';
  public htmlElement!: ElementRef<HTMLElement>;

  constructor(
    private _elem: ElementRef<HTMLElement>
  ) {
    this.htmlElement = this._elem;
  }

  @Input() public set valid( isValid: boolean ) {    
    isValid
    ? this.htmlElement.nativeElement.classList.add('hidden')
    : this.htmlElement.nativeElement.classList.remove('hidden');
  }
  @Input() public set message( msg: string ) {
    this._message = msg;
    this.setMessage();
  }
  ngOnInit(): void {
    this.setMessage();
  }

  setMessage = () => this.htmlElement.nativeElement.textContent = this._message;
}
