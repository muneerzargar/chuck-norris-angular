import { Component, OnInit, Input } from '@angular/core';
import { IJokeItem } from 'src/app/interfaces/CN.interface';
import { JokesService } from 'src/app/services/jokes.service';

@Component({
  selector: 'app-cnjokes-list',
  templateUrl: './cnjokes-list.component.html',
  styleUrls: ['./cnjokes-list.component.scss']
})
export class CNJokesListComponent implements OnInit {
  @Input() list: IJokeItem[];
  constructor(private jokeSrv: JokesService) { }

  ngOnInit() {
    console.log('list::', this.list);
  }

  onItemClick(joke: IJokeItem) {
    console.log(joke);
    const {type} = joke;
    if (type === 'favorite') {
      this.jokeSrv.addToFavorites(joke);
    } else if ( type === 'delete') {
      this.jokeSrv.deleteFromFavorites(joke);
    }
  }

}
