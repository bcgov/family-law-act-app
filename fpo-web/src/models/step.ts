import { Page } from "./page";

export class Step {
  public id?: string;
  public type: string;
  result?: object;
  metadata?: object;
  pages?: Array<Page> = new Array<Page>();
  active: boolean;
  lastUpdate: Date;
}
