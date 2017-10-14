import { Component, OnInit } from '@angular/core';
import {SearchService} from "../common/services/search.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-result-box',
  templateUrl: './result-box.component.html',
  styleUrls: ['./result-box.component.scss']
})
export class ResultBoxComponent implements OnInit {

  public repos$: Observable<GithubRepo[]>;

  constructor(
      private _searchService: SearchService
  ) {
    this.repos$ = this._searchService.result$;
  }

  ngOnInit() {
  }

  public goto(repo: GithubRepo): void {
    window.location.href = repo.html_url;
  }

}
