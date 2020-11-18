import { Component, OnInit, OnDestroy } from '@angular/core';
import { IJokeItem, IResponse } from 'src/app/interfaces/CN.interface';
import { RequestService } from 'src/app/services/request.service';
import { Subscription } from 'rxjs';
import { JokesService } from 'src/app/services/jokes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  jokesList: IJokeItem[] = [];
  jokesSubscription: Subscription;

  constructor(private request: RequestService) { }

  ngOnInit() {
  }

  onJokesClick() {
    this.jokesSubscription = this.request.getJokes().subscribe((data: IJokeItem[]) => {
      this.jokesList = [...data];
    });
  }

  ngOnDestroy() {
    if (this.jokesSubscription) {
      this.jokesSubscription.unsubscribe();
    }
  }

}
