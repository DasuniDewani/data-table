import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from "./table/table.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, TableComponent, HttpClientModule]
})
export class AppComponent {
  title = 'data-table';
}
