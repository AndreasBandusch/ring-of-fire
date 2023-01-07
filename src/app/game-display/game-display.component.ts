import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.scss']
})
export class GameDisplayComponent implements OnInit, OnChanges {
 @Input() cardsToPlay: number;
 @Input() sinOrPlu: string;
 @Input() playAllowed: boolean;
 @Input() alertMessage: string;
 @Input() addBlink: boolean;
 @Input() messageBlink: boolean;
 

  constructor() { }

  ngOnInit(): void {
  
  }

  

  ngOnChanges() {
   
    
  }

  
}

