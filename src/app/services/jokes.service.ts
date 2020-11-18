import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IJokeItem } from '../interfaces/CN.interface';
@Injectable({
  providedIn: 'root'
})
export class JokesService {
  private savedJokesList: IJokeItem[] = [];
  private jokesDataSource = new BehaviorSubject([]);
  jokesData = this.jokesDataSource.asObservable();

  constructor() { }

  addToFavorites(item: IJokeItem) {
    if (!this.savedJokesList.includes(item)) {
      this.savedJokesList.push(item);
    }
    this.jokesDataSource.next(this.savedJokesList);
  }

  deleteFromFavorites(favoriteList: IJokeItem[], item: IJokeItem) {
    const list = favoriteList.filter(jItem => jItem.id !== item.id);
    this.jokesDataSource.next(list);
  }
}
