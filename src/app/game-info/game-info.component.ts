import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})


export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks.' },
    { title: 'Me', description: 'The player who picks this card drinks.' },
    { title: 'Thumb Master', description: 'The player with this card can put their thumb down at any time during the game and the last person to do the same has to drink.' },
    { title: 'Guys', description: 'All the lads have to drink.' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'The player with this card can put their hand up at any time during the game and the last person to do the same has to drink.' },
    { title: 'Mate', description: 'The player can pick a mate who has to drink with them.' },
    { title: 'Rhyme', description: 'Say a word and go round the circle rhyming with that words, whoever hesitates or can’t think of a word has to drink.' },
    { title: 'Category', description: 'Pick a category and say a word within that category and go round the circle, whoever hesitates or can’t think of a word has to drink.' },
    { title: 'Rule', description: 'Make up a rule for the rest of the game, whoever breaks the rule has to drink.' },
    { title: 'Question Master', description: 'The player with this card has to ask someone a question, if the person answers they have to drink, if they call out that you’re the question master then you have to drink.' },
    { title: 'Cup', description: 'Add some of your drink to the king’s cup, if you have the last king then you have to drink the king’s cup!' },
  ];
  title = '';
  description = '';

  @Input() card: string;
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
