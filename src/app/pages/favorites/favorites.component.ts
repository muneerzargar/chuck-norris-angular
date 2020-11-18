import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RequestService } from 'src/app/services/request.service';
import { IResponse, IJokeItem } from 'src/app/interfaces/CN.interface';
import { JokesService } from 'src/app/services/jokes.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  buttonState = true;
  favoriteList: IJokeItem[] = [];
  favoriteSubscription: Subscription;

  constructor(private request: RequestService, private jokeSrv: JokesService) { }

  ngOnInit() {
    if (localStorage.getItem('favorites') !== null) {
      this.favoriteList = JSON.parse(localStorage.getItem('favorites'));
    }

    this.jokeSrv.jokesData.subscribe((jokeData) => {
      if (jokeData.length) {
        console.log('I am in favorites', jokeData);
        this.favoriteList = jokeData.map((item) => {
          const newItem = {...item};
          newItem.buttonLabel = 'Delete Favorite';
          newItem.type = 'delete';
          return newItem;
        });
        this._setFavoritesStorage();
      } else {
        this.favoriteList = [];
        localStorage.clear();
      }
  });
  // TODO: Add condition here ..
    this._getFavorites();
  }

  onButtonToggle() {
    this.buttonState = !this.buttonState;
    if (this.buttonState) {
      this._getFavorites();
    } else {
      if (this.favoriteSubscription) {
        this.favoriteSubscription.unsubscribe();
      }
    }
  }

  ngOnDestroy() {
    if (this.favoriteSubscription) {
      this.favoriteSubscription.unsubscribe();
    }
  }

  _getFavorites() {

      this.favoriteSubscription = this.request.getfavoriteOnInterval().subscribe((data: IResponse) => {
        if (this.favoriteList.length < 10 ) {
          const {value} = data;
          const [favorite] = value;
          favorite.buttonLabel = 'Delete Favorite';
          favorite.type = 'delete';
          if (!this.favoriteList.includes(favorite)) {
            this.favoriteList.push(favorite);
          }
          this._setFavoritesStorage();
        } else {
          if (this.favoriteSubscription) {
            this.favoriteSubscription.unsubscribe();
          }
        }
      });
  }

  _setFavoritesStorage() {
    localStorage.setItem('favorites', JSON.stringify(this.favoriteList));
  }

}
