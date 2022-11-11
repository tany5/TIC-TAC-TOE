import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BoardService } from '../core/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  isReset = new BehaviorSubject<boolean>(false)

  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
  }

  resetBoard(){   
    this.isReset.next(true)
    this.boardService.resetBoard()
  }

}
