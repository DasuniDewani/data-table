import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  imports: [CommonModule]
})
export class TableComponent implements OnInit {
  comments!: any[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.dataService.getComments().subscribe(comments => {
      this.comments = comments;
    });
  }
}
