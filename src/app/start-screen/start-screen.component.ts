import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  headerScale: object;


  constructor(private firestore: AngularFirestore, private router: Router) {
  }


  ngOnInit(): void {
  }


  newGame() {
    // Start game
    let game = new Game();
    this
      .firestore
      .collection('games')
      .add(game.toJson())
      .then((gameInfo: any) => {
        this.router.navigateByUrl('/game/' + gameInfo.id);
      });
  }


  enlargeHeaderScale(): void {
    this.headerScale = {
      "transform": "scale(1.5) translateY(10px)",
      "transition": "all 1.5s ease-in-out",
    }
  }


  reduceHeaderScale(): void {
    this.headerScale = {
      "transform": "scale(1) translateY(0px)",
      "transition": "all 1.5s ease-in-out",
    }
  }
}
