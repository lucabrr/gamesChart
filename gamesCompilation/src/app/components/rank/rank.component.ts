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
  pageIndex:number=0
  url: string =
     `https://gameschartbe.hop.sh/api/userRecord/pageable?page=${this.pageIndex}&size=10&sort=move,ASC`;
   //for test
   // `http://localhost:8080/api/userRecord/pageable?page=${this.pageIndex}&size=10&sort=move,ASC`
  rank: IUserRecord[] = [];
  serverError: boolean = false;
  isLoading: boolean = false;
  pageable:Ipageable = { content: [] };

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
        this.pageable=res;
        this.rank = res.content;
        this.isLoading = false;
      });
  }
  updateUrl(){
    this.url = `http://localhost:8080/api/userRecord/pageable?page=${this.pageIndex}&size=10&sort=move,ASC`
  }
  previous(){
    if(this.pageIndex === 0){return}
    this.pageIndex = this.pageIndex - 1
    this.updateUrl()
    this.getData()

  }
  next(){
    if(this.pageIndex === this.pageable.totalPages){return}
    this.pageIndex = this.pageIndex + 1
    this.updateUrl()
    this.getData()
  }
}
