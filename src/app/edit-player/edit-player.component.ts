import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfilePictures = ['player-picture-male.png', 'player-picture-male2.jpg', 
    'player-picture-male3.jpg','player-picture-female.svg', 'player-picture-female2.jpg','winkboy.svg'];

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }

  ngOnInit(): void {
  }

  selectProfilePicture(picture: String) {
    console.log(picture);
  }

}
