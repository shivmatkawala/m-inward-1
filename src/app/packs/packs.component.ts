import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-packs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.css']
})
export class PacksComponent implements OnInit, OnChanges {
  @Input() batch: any;
  numberOfPacks: number = 0;
  packs: Array<any> = [];
  totalNetWeight = 0;
  packList: any[] = [];
  formVisible = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.initializePacks();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['batch'] && this.batch) {
      this.initializePacks();
      this.packList = this.dataService.getCurrentPacks()[this.batch.batchNo] || [];
      this.formVisible = true;
    }
  }

  initializePacks() {
    this.numberOfPacks = 0;
    this.packs = [];
    this.totalNetWeight = 0;
    this.packList = this.dataService.getCurrentPacks()[this.batch.batchNo] || [];
    if (this.packList.length > 0) {
      this.numberOfPacks = this.packList.length;
      this.packs = this.packList;
      this.totalNetWeight = this.packs.reduce((sum, pack) => sum + pack.netWeight, 0);
    }
  }

  createPacksArray() {
    this.packs = new Array(this.numberOfPacks).fill({}).map((_, index) => ({
      packNo: index + 1,
      grossWeight: 0,
      tareWeight: 0,
      netWeight: 0
    }));
    this.totalNetWeight = 0; // Reset total net weight
  }

  updateNetWeight(pack: any) {
    pack.netWeight = Math.max(0, pack.grossWeight - pack.tareWeight);
    this.totalNetWeight = this.packs.reduce((sum, p) => sum + p.netWeight, 0);
  }

  onSubmit() {
    const validPacks = this.packs.filter(pack => pack.grossWeight > 0 || pack.tareWeight > 0 || pack.netWeight > 0);
    
    if (this.totalNetWeight === this.batch.quantity) {
      this.dataService.savePacks(this.batch.batchNo, validPacks);
      this.packList = validPacks;
      alert('Packs submitted successfully');
      this.formVisible = false; // Hide the form after successful submission
    } else {
      alert('Total net weight must equal batch quantity');
    }
  }
}
