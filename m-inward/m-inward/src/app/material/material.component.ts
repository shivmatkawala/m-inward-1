import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.css'
})
export class MaterialComponent {
  materials = ['Material 1', 'Material 2', 'Material 3'];
  suppliers = ['Supplier 1', 'Supplier 2', 'Supplier 3'];
  formData = {
    material: '',
    supplier: '',
    quantity: 0
  };
  isVisible = true;

  constructor(private dataService: DataService) {
    this.dataService.isMaterialVisible.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  onSubmit() {
    this.dataService.changeMaterial(this.formData);
    this.dataService.setMaterialVisibility(false); 
  }
}
