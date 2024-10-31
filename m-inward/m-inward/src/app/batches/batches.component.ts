import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { PacksComponent } from '../packs/packs.component';

@Component({
  selector: 'app-batches',
  standalone: true,
  imports: [CommonModule, FormsModule, PacksComponent],
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {
  materialData: any;
  batchData = {
    batchNo: '',
    quantity: 0
  };
  batches: Array<any> = [];
  totalQuantity = 0;
  selectedBatch: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.currentMaterial.subscribe(material => {
      this.materialData = material;
      this.totalQuantity = 0;
      this.batches = [];
    });
  }

  addBatch() {
    const newTotalQuantity = this.totalQuantity + (this.batchData?.quantity || 0);
    if (this.materialData && newTotalQuantity <= this.materialData.quantity) {
      // Check if batch number already exists
      if (this.isBatchNumberUnique(this.batchData.batchNo)) {
        this.batches.push({ ...this.batchData });
        this.totalQuantity = newTotalQuantity;
        this.batchData = { batchNo: '', quantity: 0 }; // Reset form
        if (newTotalQuantity == this.materialData.quantity) {
          this.toggleForm(false); // Hide the form
        }
      } else {
        alert('Batch number already exists. Please enter a unique batch number.');
      }
    } else {
      alert('Total quantity of batches cannot exceed material quantity');
    }
  }

  isBatchNumberUnique(batchNo: string): boolean {
    return this.batches.every(batch => batch.batchNo !== batchNo);
  }

  toggleForm(visible: boolean) {
    const divid = document.getElementById('batchform');
    if (divid) {
      divid.style.display = visible ? 'block' : 'none';
    }
  }

  deleteBatch(index: number) {
    if (this.batches[index]) {
      const batchNo = this.batches[index].batchNo;
      this.totalQuantity -= this.batches[index].quantity;
      this.batches.splice(index, 1);
      this.dataService.deletePacks(batchNo); // Delete packs for the batch
      
      if (this.batches.length === 0) {
        this.dataService.setMaterialVisibility(true); // Show the Material form when all batches are deleted
      }
      
      // Check if total quantity is less than material quantity to show the form
      if (this.totalQuantity < this.materialData.quantity) {
        this.toggleForm(true); // Show the form
      }

      this.selectedBatch = null;
      this.dataService.changeBatch(null);
    }
  }

  selectBatch(batch: any) {
    this.selectedBatch = batch;
    this.dataService.changeBatch(batch);
  }
}
