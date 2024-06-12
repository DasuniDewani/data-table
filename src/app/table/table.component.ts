import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  imports: [CommonModule, SearchComponent, PaginationComponent]
})
export class TableComponent implements OnInit {
  comments: any[] = [];
  filteredComments: any[] = [];
  paginatedComments: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchTerm: string = '';
  sortDirection: boolean = true;
  

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getComments().subscribe(data => {
      this.comments = data;
      this.filteredComments = data;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedComments = this.filteredComments.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  onSearch(term: string): void {
    this.searchTerm = term.toLowerCase();
    this.filteredComments = this.comments.filter(comment =>
      comment.email.toLowerCase().includes(this.searchTerm) ||
      comment.name.toLowerCase().includes(this.searchTerm) || 
      comment.body.toLowerCase().includes(this.searchTerm)
    );
    this.updatePagination();
  }

  sortData(column: string): void {
    this.sortDirection = !this.sortDirection;
    const direction = this.sortDirection ? 1 : -1;
    this.filteredComments.sort((a, b) => a[column] > b[column] ? direction : -direction);
    this.updatePagination();
  }

  deleteComment(id: number): void {
    this.comments = this.comments.filter(comment => comment.id !== id);
    this.onSearch(this.searchTerm);
  }

  highlightText(text: string): string {
  if (!this.searchTerm || !text) {
    return text;
  }

  const pattern = new RegExp(this.searchTerm, 'gi');
  return text.replace(pattern, match => `<span class="highlight">${match}</span>`);
}

}
