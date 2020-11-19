import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
      this.jokeSrv.jokes = JSON.parse(localStorage.getItem('favorites'));
    }
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
        if (this.jokeSrv.jokes.length < 10 ) {
          const {value} = data;
          const [favorite] = value;
          this.jokeSrv.addToFavorites(favorite);
        } else {
          if (this.favoriteSubscription) {
            this.favoriteSubscription.unsubscribe();
          }
        }
      });
  }
}
