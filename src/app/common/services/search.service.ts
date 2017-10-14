import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/finally';

@Injectable()
export class SearchService {

  private _result$$: Subject<GithubRepo[]> = new Subject<GithubRepo[]>();
  public get result$(): Observable<GithubRepo[]> {
    return this._result$$.asObservable();
  }
  public search$$: Subject<string> = new Subject<string>();

  private _indicator$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );
  public get indicator$(): Observable<boolean> {
    return this._indicator$$.asObservable();
  }

  private _total_count$$: BehaviorSubject<number> = new BehaviorSubject<number>( 0 );
  public get total_count$(): Observable<number> {
    return this._total_count$$.asObservable();
  }

  public constructor(
      private _httpClient: HttpClient
  ) {
    this.search$$
        .filter((searchTerm) => (searchTerm.trim().length > 0))
        .distinctUntilChanged()
        .debounceTime(500)
        .subscribe( searchTerm => this._search(searchTerm));
  }

  private _search( searchTerm: string): void {
    this._indicator$$.next(true);
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchTerm)}`;
    this._httpClient.get(url)
        .finally(() => {this._indicator$$.next(false); })
        .subscribe((data: any) => {
            this._total_count$$.next(data.total_count);
            this._result$$.next(data.items.map((item) => {
              return {
                name: item.name,
                full_name: item.full_name,
                owner: {
                  login: item.owner.login,
                  avatar_url: item.owner.avatar_url,
                  html_url: item.owner.html_url,
                },
                'private': item.private,
                html_url: item.html_url,
                description: item.description,
                stargazers_count: item.stargazers_count,
                forks_count: item.forks_count,
                watchers_count: item.watchers_count,
                score: item.score,
              };
            }));
          });
  }

}
