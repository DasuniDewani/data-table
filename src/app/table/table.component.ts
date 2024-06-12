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
  sortField: string = 'id';
  sortOrder: string = 'asc';
  isLoading: boolean = false;
  

  constructor(private dataService: DataService) {}

    ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.isLoading = true;
    this.dataService.getComments().subscribe(data => {
      this.comments = data;
      this.filteredComments = data;
      this.updatePagination();
      this.isLoading = false;
    }, error => {
      this.isLoading = false; 
      console.error('Error fetching comments:', error);
    });
  }


    updatePagination(): void {
    if (this.itemsPerPage === 0) {
      this.paginatedComments = this.filteredComments;
    } else {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.paginatedComments = this.filteredComments.slice(startIndex, startIndex + this.itemsPerPage);
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
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

  sortData(field: string, order: string): void {
    this.sortField = field;
    this.sortOrder = order;
    this.sortComments();
    this.updatePagination();
  }

  sortComments(): void {
    const direction = this.sortOrder === 'asc' ? 1 : -1;
    this.filteredComments.sort((a, b) => {
      if (a[this.sortField] > b[this.sortField]) {
        return direction;
      } else if (a[this.sortField] < b[this.sortField]) {
        return -direction;
      } else {
        return 0;
      }
    });
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
