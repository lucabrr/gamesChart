import { Component, OnInit } from '@angular/core';
import { IcardMemory } from 'src/app/interface/IcardMemory';


@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {
 unshuffledArray:IcardMemory[] = []
 cardContainer:IcardMemory[] = []
 arrayChecker:IcardMemory[] = []
 move:number = 0
 lastClick:number = 0
 clickDelay:number = 300
 minute:number = 0
 second:number = 0
 timerID:any
 winAlert:boolean=false

  ngOnInit(): void {
    this.start()
  }

   start():void{
    for(let i = 1 ; i<= 20 ; i++){
      let y = (i <= 10)? i: i - 10
      let card:IcardMemory =
        {
          value: y,
          fold: true,
          find:false,
        }
        this.unshuffledArray.push(card)
        this.cardContainer= this.shuffleArray(this.unshuffledArray)
    }
    this.timer()
  }

   play(card:IcardMemory):void{
    if(!this.delay()){return}
    if(card.fold && !card.find ){
      card.fold = false
      this.arrayChecker.push(card)
      if(this.arrayChecker.length === 2){
        this.checkCardValue()
        this.move++
      }
    }
    this.stopGame()
  }
  private checkCardValue():void{
    if (this.arrayChecker[0].value === this.arrayChecker[1].value){
      this.arrayChecker[0].find = true
      this.arrayChecker[1].find = true
      this.arrayChecker = []
    }
    else{
      setTimeout(()=>{
        this.arrayChecker[0].fold = true
        this.arrayChecker[1].fold = true
        this.arrayChecker = []
      },300)

    }
  }
  //Fisher-Yates's algoritm
  private shuffleArray(array:IcardMemory[]):IcardMemory[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  private delay():boolean{
    const currentTime = Date.now()
    if((currentTime - this.lastClick) >= this.clickDelay ){
      this.lastClick = currentTime
      return true
    }else{return false}
  }
  private timer():void{
    this.timerID = setInterval(()=>{
      this.second++
      if(this.second >= 60){
        this.minute++
        this.second = 0
      }
    },1000)
  }
  private winCondition():boolean{
    return this.cardContainer.every((card)=> card.find)
  }
  private stopGame():void{
    if (this.winCondition()){
      clearInterval(this.timerID)
      this.winAlert= true
    }
  }
// set personal best
// start button
}




