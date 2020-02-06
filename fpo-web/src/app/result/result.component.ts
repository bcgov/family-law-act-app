import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralDataService } from 'app/general-data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  public state : string;
  public serviceType: string;

  constructor(private route: ActivatedRoute, private dataService: GeneralDataService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.state = params.state;
      this.dataService.setUserPreferredServiceType(params.serviceType);
      console.log(this.state);
    });
  }

}
