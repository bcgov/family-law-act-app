import { Injectable }  from '@angular/core';
import { InsertComponent } from './insert.component';

@Injectable()
export class InsertService {
  private inserts : {[id : string]: InsertComponent} = {};

  constructor() {}

  registerInsert(id : string, comp : InsertComponent) {
    this.inserts[id] = comp;
  }

  clearInsert(id : string) {
    this.updateInsert(id, null);
  }

  updateInsert(id : string, compSpec : {component : any, inputs : any}) {
    if(this.inserts[id]) {
      // may be blank, in which case the component is hidden
      this.inserts[id].componentSpec = compSpec;
    } else {
      console.error('insert block not found for update: ' + id);
    }
  }
}
