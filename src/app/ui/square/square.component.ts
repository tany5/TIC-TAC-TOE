import { BoardService } from './../../core/board.service';
import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit, AfterViewInit {
  @Input() square: any
  @Input() reSetClicked: Observable<boolean> | undefined
  @ViewChildren('squareEle') squareEle: QueryList<any> | undefined

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.reSetClicked?.subscribe((isReset)=>{
      if(isReset){
        this.resetBoard()
      }
    })
  }

  setNextPlayer(event:any){   
    this.boardService.setNextPlayer(this.square, event) 
  }
  ngAfterViewInit(): void {
    //console.log(this.squareEle)
  }  

  resetBoard(){
    this.squareEle?.forEach((ele: ElementRef)=>{
      ele.nativeElement.innerHTML = ''
    })
  }

}
