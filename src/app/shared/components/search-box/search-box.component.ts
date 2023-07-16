import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private deboucerSuscription?: Subscription;


  @Input()
  public initialValue: string = '';

  @Input()
  public placeholder: string = '';

  @Output()
  public onDebounce = new EventEmitter<string>();

  @Output()
  public onValue = new EventEmitter<string>();

  ngOnInit(): void {
    this.deboucerSuscription =
    this.debouncer
    .pipe(
      debounceTime(800)
      )
      .subscribe( value => {
        this.onDebounce.emit(value);
      })
    }

  ngOnDestroy(): void {
    this.deboucerSuscription?.unsubscribe();
  }

  emitValue(value: string):void{
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string ){
    this.debouncer.next(searchTerm);
  }

}
