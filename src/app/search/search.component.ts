import { Component, EventEmitter, Output,  } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() searchTerm = new EventEmitter<string>();

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300) 
    ).subscribe((term: string) => this.searchTerm.emit(term.toLowerCase()));
  }


  onInput(event: any): void {
    this.searchSubject.next(event.target.value);
  }
}
