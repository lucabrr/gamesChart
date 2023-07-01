import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ibox } from 'src/app/interface/ibox';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent  {

  @ViewChild("content")
  myModal!:ElementRef
  grid:Ibox[] = []
  isStarted:boolean = false
  isDraw:boolean = false

  winner:String = ""
  won:number= 0
  draw:number = 0
  lose:number= 0
  isClickable:boolean = true
  winningCondition:number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  constructor(private modal: NgbModal){}


  start(): void{
    if(!this.isStarted){
      this.isStarted = true

      for(let i = 0;  i < 9; i++) {
      const box:Ibox = {value:""}
      this.grid.push(box)
      console.log(this.grid)
      }
    }
  }
  play(box: Ibox): void {
    if (!box.value && this.isClickable && !this.winner) {
      box.value = "X"
      this.isClickable = false
      this.checkWinner()



      setTimeout(() => {
        this.enemyTurn()
        setTimeout(() => {
          this.checkDraw()
          this.checkWinner()
          this.isClickable = true
        }, 0)
      }, 700)
    }
  }

  enemyTurn(): void {
    if(!this.winner){
      const remaningBox = this.grid.filter(box => !box.value)
      if (remaningBox.length > 0) {
        const randomIndex = Math.floor(Math.random() * remaningBox.length)
        remaningBox[randomIndex].value = "O"
      }
    }
  }

  checkWinner():void{
    if(!this.winner){
      for(const combination of this.winningCondition){
       const [a,b,c] = combination
        if(
         this.grid[a].value === this.grid[b].value && this.grid[a].value === this.grid[c].value
        ){
          this.winner = this.grid[a].value
         if (this.winner){
          //  alert(`${this.winner} ha vinto!`)
          this.modal.open(this.myModal)
          this.whoWin()
        }
        return
      }
     }
    }
  }

  reset(){
    this.grid = []
    this.isStarted = false
    this.isDraw=false
    this.start()
    this.winner=""
    this.isClickable= true
  }

  whoWin(){
    switch(this.winner){
      case "X" : this.won++
        break
      case "O": this.lose++
    }
  }

  checkDraw(){
  const gridFilled = this.grid.filter((box)=> box.value)
  if(gridFilled.length === 9 && !this.winner){

    this.isDraw = true
    this.draw++
    this.reset()
  }
  }

}
