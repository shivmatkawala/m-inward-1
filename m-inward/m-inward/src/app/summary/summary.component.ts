import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  materialData: any;
  batchesCount: number = 0;
  totalPacksCount: number = 0;
  showSummary: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.currentMaterial.subscribe(material => {
      this.materialData = material;
      this.updateSummary();
    });

    this.dataService.currentPacks.subscribe((packs) => {
      this.totalPacksCount = this.calculateTotalPacks(packs);
      this.batchesCount ++
      this.updateSummary();
    });

    // this.dataService.summaryButtonClicked$.subscribe(() => {
    //   this.checkShowSummary();
    // });
  }

  updateSummary() {
    if (this.materialData) {
      this.batchesCount = Object.keys(this.dataService.getCurrentPacks()).length;
      this.checkShowSummary();
    }
  }

  checkShowSummary() {
    const materialQuantity = this.materialData.quantity;
    const totalNetWeight = this.calculateTotalNetWeight();

    this.showSummary = totalNetWeight === materialQuantity;
  }

  calculateTotalPacks(packs: { [key: string]: any[] }): number {
    let total = 0;
    Object.values(packs).forEach(batchPacks => {
      total += batchPacks.length;
    });
    return total;
  }

  calculateTotalNetWeight(): number {
    let totalNetWeight = 0;
    Object.values(this.dataService.getCurrentPacks()).forEach(batchPacks => {
      batchPacks.forEach(pack => {
        totalNetWeight += pack.netWeight;
      });
    });
    return totalNetWeight;
  }
}
