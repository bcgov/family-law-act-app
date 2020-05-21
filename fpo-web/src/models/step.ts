import { Page } from "./page";

export class Step {
  public id?: string;
  public type: string;
  public label: string;
  public icon: string;
  result: object = {};
  metadata?: object;
  pages?: Array<Page> = new Array<Page>();
  currentPage: number;
  active: boolean;
  lastUpdate: Date;
}
