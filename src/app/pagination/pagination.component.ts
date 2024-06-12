import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;
  rowOptions: number[] = [10, 15, 20];

  ngOnChanges(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  changeRowsPerPage(option: number): void {
    this.itemsPerPage = option;
    if (option === 0) {
      this.totalPages = 1;
    } else {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    }
    this.currentPage = 1;
    this.pageChange.emit(this.currentPage);
    this.itemsPerPageChange.emit(this.itemsPerPage);
  }
}
