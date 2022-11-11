import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  boardSize = 9
  baord:any[] = []
  activePlayer: string = "X"
  playerWon:any = {won: undefined, status: "Game Not Started"}
  turnCount: number = 0
  isGameOver: boolean = false
  wining_combination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]
  playerXArray:number[] = []
  playerOArray:number[] = []
  
  constructor() { 
    this.setBoard()
  }
  
  setBoard(){
    for( let i = 0; i< this.boardSize; i++ ){
      this.baord.push({ index:i, user:'' })
    }
  }
  
  setNextPlayer(squareClicked:any, element:any): any {
    if(this.activePlayer === 'X'){
      this.playerXArray.push(squareClicked.index)
    }else{
      this.playerOArray.push(squareClicked.index)
    }
    
    if(!this.isGameOver){
      element.target.innerHTML = this.activePlayer
      this.playerWon.won = false
      this.playerWon.status = 'Game In Progress'
    }
    this.checkIsGameOver()
    this.activePlayer = this.activePlayer === 'X' ? 'O' : "X"
    this.turnCount++
    if(!this.isGameOver && this.turnCount>8)
    {      
      this.playerWon.won = false
      this.playerWon.status = 'Match Draw'
    } 
  }
  
  checkIsGameOver(): any{
    if(this.playerXArray.length > 2 || this.playerOArray.length > 3)
    {    
      if(this.checkWhoOwn(this.playerXArray)){
        this.isGameOver = true        
        this.playerWon.won = true
        this.playerWon.status = 'Player X Won'
        return 
      }
      else if(this.checkWhoOwn(this.playerOArray)){
        this.isGameOver = true          
        this.playerWon.won = true
        this.playerWon.status = 'Player O Won'
        return                  
      }          
    }    
  }
  
  checkWhoOwn(arr:any){
    return this.wining_combination.some((arrELe:any)=>{
      let match = arrELe.filter((arr1: number)=>{
        return arr.includes(arr1)
      })  
      return match.length > 2      
    })
  }
  
  resetBoard(){
    this.playerWon = {won: undefined, status: "Game Not Started"}    
    this.playerXArray = []
    this.playerOArray = []
    this.turnCount = 0
    this.isGameOver = false
    this.activePlayer = "X"
  }
}
