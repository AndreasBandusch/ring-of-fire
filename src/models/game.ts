export class Game {
    public players: string[] = [];
    public playerImages: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';
    public sinOrPlu: string = 'cards';
    public gameOver: boolean = false;
    public topCardPos: number = 50;


    constructor(players?: any, playerImages?: any) {
        this.createCardStack();
        if (players)  {
            this.players = players;
            this.playerImages = playerImages;
        } 
    }

    createCardStack() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('spade_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        shuffle(this.stack);
    }


    public toJson() {
         return {
            players: this.players,
            playersImages: this.playerImages,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard,
            sinOrPlu: this.sinOrPlu,
            gameOver: this.gameOver,
            topCardPos: this.topCardPos
         }
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  