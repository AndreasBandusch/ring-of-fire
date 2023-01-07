import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit {
  game: Game;
  gameId: any;
  playAllowed: boolean = true;
  alertMessage: string;
  tooFewPlayersText: string = 'At least <span class="highlight">1</span> player is needed to play!';
  tooManyPlayersText: string = 'Maximum <span class="highlight">6</span> players are allowed to play!';
  cardsCssTransforms: object[] = [];
  addBlink: boolean = true;
  messageBlink: boolean = false;
  routerA: Router;
 

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: AngularFirestore, private router: Router) {
    this.routerA = this.router;
  } 
    

  ngOnInit(): void {
    this.newGame();
    this.subscribeData();
  }


  subscribeData() {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.firestore
      .collection('games')
      .doc(this.gameId)
      .valueChanges()
      .subscribe((game: any) => {
        this.updateData(game);
       });
    });
  }


  updateData(game: any) {
    this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.playerImages = game.playersImages;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
        this.game.sinOrPlu = game.sinOrPlu;
        this.game.gameOver = game.gameOver;
        this.game.topCardPos = game.topCardPos;
  }


  newGame() {
    this.game = new Game();
    this.playAudio("assets/audio/ice-cubes.wav");
  }
  

  takeCard(): void {
    this.checkNumberOfplayers();
    if (!this.game.pickCardAnimation && this.playAllowed) {
        this.playCard();
        setTimeout(() => {
          this.playCardAnimation();
          if (this.game.stack.length === 0) {
            this.showEndScreen();
          }
        }, 1000);
    }
  }


  playCard(): void {
    this.playAudio("assets/audio/play-card.wav");
    this.game.currentCard = this.game.stack.pop();
    this.game.pickCardAnimation = true;
    this.game.topCardPos--;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
  }


  playCardAnimation(): void {
    this.game.playedCards.push(this.game.currentCard);
    this.game.pickCardAnimation = false;
    this.saveGame();
    this.counterCards();
  }
  

  checkNumberOfplayers(): void {
    if (this.game.players.length > 0) {
      this.playAllowed = true 
    } else {
      this.showTooFewPlayersMessage();
    }
  }


  showTooFewPlayersMessage(): void {
    this.alertMessage = this.tooFewPlayersText;
    this.playAllowed = false;
    this.setAnimation('addBlink');
    this.playAudio("assets/audio/message-sound.wav");
  }


  showEndScreen(): void {
    this.playAudio("assets/audio/game-over.wav");
    this.game.gameOver = true;
    this.saveGame();
  }


  openDialog(): void {
    if (this.game.players.length < 6)  {
      this.addPlayer();
    }  else {
      this.showTooManyPlayersMessage();
    }
  }


  addPlayer(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
      dialogRef.afterClosed().subscribe((name: string) => {
        if (name && name.length > 0) 
          this.game.players.push(name);
          this.game.playerImages.push('winkboy.svg');
          if (this.game.players.length > 1) this.playAllowed = true;
          this.saveGame();
      });
  }


  showTooManyPlayersMessage(): void {
    this.playAudio("assets/audio/message-sound.wav");
    this.setAnimation('messageBlink');
    this.alertMessage = this.tooManyPlayersText;
    this.playAllowed = false;
  }


  saveGame(): void {
    this.firestore
    .collection('games')
    .doc(this.gameId)
    .update(this.game.toJson());
  }
  
  
  editPlayer(playerId: any): void {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if(change) {
        if (change == 'DELETE') {
          this.deletePlayer(playerId);
          if (this.game.players.length < 1) { 
            this.showTooFewPlayersMessage(); 
          }
        } else {
          this.game.playerImages[playerId] = change;
        }
        this.saveGame();
      }
    });
  }


  deletePlayer(playerId :number): void {
    this.game.players.splice(playerId, 1);
    this.game.playerImages.splice(playerId, 1);
  }


  counterCards(): void {
    let still = this.game.stack.length;
    if (still === 1) {
      this.game.sinOrPlu = 'card';
    } else {
      this.game.sinOrPlu = 'cards';
    }
    this.saveGame();
  }


  restartGame(): void {
    this.game.gameOver = false;
    if (this.game.players.length > 1) this.playAllowed = true;
    this.game = new Game(this.game.players, this.game.playerImages);
    this.playAudio("assets/audio/ice-cubes.wav");
    this.saveGame();
  }


  getRandomCardPosition(i: number) {
    let deg: string = Math.floor(Math.random() * (45 - (-45) + 1)) + (-45) + 'deg';
    let posX: string = Math.floor(Math.random() * (160 - 120 + 1)) + 120 + 'px';
    let posY: string = Math.floor(Math.random() * ((-160) - (-120) + 1)) + (-160) + 'px';
   
    this.cardsCssTransforms.push( {
      "transform": `scale(1.3) translateX(${posX}) translateY(${posY}) rotate(${deg})`
    });
    return this.cardsCssTransforms[i];
  }


  playAudio(audioFile: string): void {
    let audio = new Audio();
    audio.src = audioFile;
    audio.load();
    if (audioFile === "assets/audio/play-card.wav") {
      setTimeout(() => {
        audio.play();
     }, 900);
    } else {
      audio.play();
    }
  }

  setAnimation(animation : string): void {
    let animationTime: number;
    if (animation === 'addBlink' ? animationTime = 5000 :  animationTime = 1500)
    this[animation] = true;
    setTimeout(() => {
      this[animation] = false;
    }, animationTime)
  }
}
  

