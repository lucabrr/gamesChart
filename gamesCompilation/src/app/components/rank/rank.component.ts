import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Ipageable } from 'src/app/interface/ipageable';

import { IUserRecord } from 'src/app/interface/iuser-record';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss'],
})
export class RankComponent implements OnInit {
  url: string =
    'http://localhost:8080/api/userRecord/pageable?page=0&size=10&sort=move,ASC';

  rank: IUserRecord[] = [];
  serverError: boolean = false;
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.http
      .get<Ipageable>(this.url)
      .pipe(
        catchError(() => {
          this.isLoading = false;
          this.serverError = true;
          return throwError(() => new Error('ops qualcosa è andato storto'));
        })
      )
      .subscribe((res) => {
        this.rank = res.content;
        console.log(this.rank);
        this.isLoading = false;
      });
  }
}
