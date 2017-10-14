import { Component, OnInit } from '@angular/core';
import {SearchService} from "../common/services/search.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public indicator$: Observable<boolean>;
  public total_count$: Observable<number>;

  constructor(
      private _searchService: SearchService
  ) { }

  ngOnInit() {
    this.indicator$ = this._searchService.indicator$;
    this.total_count$ = this._searchService.total_count$;
  }

  public search(searchTerm) {
    this._searchService.search$$.next(searchTerm);
  }

}
