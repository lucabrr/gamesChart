import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, switchMap, throwError } from 'rxjs';
import { IcardMemory } from 'src/app/interface/IcardMemory';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss'],
})
export class MemoryComponent implements OnInit {
  protected unshuffledArray: IcardMemory[] = []; // for start logic
  protected cardContainer: IcardMemory[] = []; //
  protected arrayChecker: IcardMemory[] = []; //for checkSameCard
  protected lastClick: number = 0; // for not spam play()
  protected clickDelay: number = 550; //
  protected minute: number = 0; //for timer
  protected second: number = 0; //
  protected timerID: any; //
  protected winAlert: boolean = false;
  protected move: number = 0;
  protected isStarted: boolean = false;

  @ViewChild('content')
  myModal!: ElementRef;

  protected url: string = 'http://localhost:8080/api/userRecord';

  constructor(
    private http: HttpClient,
    private modal: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {}

  start(): void {
    this.isStarted = true;
    for (let i = 1; i <= 20; i++) {
      let y = i <= 10 ? i : i - 10;
      let card: IcardMemory = {
        value: y,
        fold: true,
        find: false,
        flip: false,
      };
      this.unshuffledArray.push(card);
      this.cardContainer = this.shuffleArray(this.unshuffledArray);
    }
    this.timer();
  }

  protected play(card: IcardMemory): void {
    if (!this.delay()) {
      return;
    }
    if (card.fold && !card.find) {
      card.fold = false;
      card.flip = true;
      this.arrayChecker.push(card);
      if (this.arrayChecker.length === 2) {
        this.checkCardValue();
        this.move++;
      }
    }
    this.stopGame();
  }
  private checkCardValue(): void {
    if (this.arrayChecker[0].value === this.arrayChecker[1].value) {
      this.arrayChecker[0].find = true;
      this.arrayChecker[1].find = true;
      this.arrayChecker = [];
    } else {
      setTimeout(() => {
        this.arrayChecker[0].fold = true;
        this.arrayChecker[1].fold = true;
        this.arrayChecker[0].flip = false;
        this.arrayChecker[1].flip = false;
        this.arrayChecker = [];
      }, 500);
    }
  }
  //Fisher-Yates's algoritm
  private shuffleArray(array: IcardMemory[]): IcardMemory[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  private delay(): boolean {
    const currentTime = Date.now();
    if (currentTime - this.lastClick >= this.clickDelay) {
      this.lastClick = currentTime;
      return true;
    } else {
      return false;
    }
  }
  private timer(): void {
    this.timerID = setInterval(() => {
      this.second++;
      if (this.second >= 60) {
        this.minute++;
        this.second = 0;
      }
    }, 1000);
  }
  private winCondition(): boolean {
    return this.cardContainer.every((card) => card.find);
  }
  private stopGame(): void {
    if (this.winCondition()) {
      clearInterval(this.timerID);
      this.winAlert = true;
      this.modal.open(this.myModal);
    }
  }

  protected inviaDati(_username: string): void {
    const today = new Date();
    const date = today.toISOString().substring(0, 10);
    const userRecord = {
      username: _username,
      move: this.move,
      data: date,
    };
    console.log(userRecord);

    this.http
      .post(this.url, userRecord)
      .pipe(switchMap((res) => this.router.navigate(['/rank'])))
      .subscribe((res) => console.log(res));
  }

  protected reset() {
    this.unshuffledArray = [];
    this.cardContainer = [];
    this.arrayChecker = [];
    this.minute = 0;
    this.second = 0;
    this.winAlert = false;
    this.move = 0;
    this.isStarted = false;
    this.start();
  }
}
