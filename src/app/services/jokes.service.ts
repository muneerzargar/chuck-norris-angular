import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IJokeItem } from '../interfaces/CN.interface';
@Injectable({
  providedIn: 'root'
})
export class JokesService {
  private jokesDataSource = new BehaviorSubject([]);

  constructor() { }

  get jokes(): IJokeItem[] {
    return this.jokesDataSource.getValue();
  }

  set jokes(val: IJokeItem[]) {
    this.jokesDataSource.next(val);
  }

  addToFavorites(item: IJokeItem) {
    const newItem = {...item};
    newItem.buttonLabel = 'Delete';
    newItem.type = 'delete';
    if (!this.jokes.some(fav => fav.id === newItem.id)) {
      if (this.jokes.length < 10) {
        this.jokes = [
          ...this.jokes,
          newItem
        ];
      }
    }
    localStorage.setItem('favorites', JSON.stringify(this.jokes));
    console.log('*** in add ***', this.jokes);
  }

  deleteFromFavorites( item: IJokeItem) {
    this.jokes = this.jokes.filter(jItem => jItem.id !== item.id);
    localStorage.setItem('favorites', JSON.stringify(this.jokes));
    console.log('*** in delete ***', this.jokes);
  }
}
