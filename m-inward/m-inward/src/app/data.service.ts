import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private materialSource = new BehaviorSubject<any>(null);
  currentMaterial = this.materialSource.asObservable();

  private materialVisibleSource = new BehaviorSubject<boolean>(true);
  isMaterialVisible = this.materialVisibleSource.asObservable();

  private batchSource = new BehaviorSubject<any>(null);
  currentBatch = this.batchSource.asObservable();

  private packsSource = new BehaviorSubject<{ [key: string]: any[] }>({});
  currentPacks = this.packsSource.asObservable();
  
  // private summaryButtonClickedSource = new BehaviorSubject<boolean>(false);
  // summaryButtonClicked$ = this.summaryButtonClickedSource.asObservable();

  // clickSummaryButton() {
  //   this.summaryButtonClickedSource.next(true);
  // }

  changeMaterial(material: any) {
    this.materialSource.next(material);
  }

  setMaterialVisibility(isVisible: boolean) {
    this.materialVisibleSource.next(isVisible);
  }

  changeBatch(batch: any) {
    this.batchSource.next(batch);
  }

  savePacks(batchNo: string, packs: any[]) {
    const currentPacks = this.packsSource.getValue();
    currentPacks[batchNo] = packs;
    this.packsSource.next(currentPacks);
  }

  deletePacks(batchNo: string) {
    const currentPacks = this.packsSource.getValue();
    if (currentPacks.hasOwnProperty(batchNo)) {
      delete currentPacks[batchNo];
      this.packsSource.next({ ...currentPacks }); // Update the packsSource
    }
  }
  getCurrentPacks(): { [key: string]: any[] } {
    return this.packsSource.getValue();
  }
}
