import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IJokeItem } from 'src/app/interfaces/CN.interface';

@Component({
  selector: 'app-cnjoke-item',
  templateUrl: './cnjoke-item.component.html',
  styleUrls: ['./cnjoke-item.component.scss']
})
export class CNJokeItemComponent implements OnInit {
  @Output() itemEvent  = new EventEmitter<IJokeItem>();
  @Input() jokeItem: IJokeItem = {
    joke: '',
    category: [],
    id: 0
  };

  constructor() { }

  ngOnInit() {
  }

  onButtonClick(jItem: IJokeItem) {
    this.itemEvent.emit(jItem);
  }

}
