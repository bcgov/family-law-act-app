import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'survey-primary',
  templateUrl: './primary.component.html',
  styleUrls: ['./primary.component.scss']
})
export class SurveyPrimaryComponent implements OnInit {

  survey : any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.survey = this.route.snapshot.data.survey;
  }

}
