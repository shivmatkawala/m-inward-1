import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialComponent } from './material/material.component';
import { BatchesComponent } from './batches/batches.component';
import { PacksComponent } from './packs/packs.component';
import { SummaryComponent } from './summary/summary.component';
import { HeaderComponent } from './header/header.component';
// import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialComponent, BatchesComponent, PacksComponent, SummaryComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'm-inward';
  // constructor(private dataService: DataService) {}

  // clickSummary() {
  //   this.dataService.clickSummaryButton();
  // }
}
