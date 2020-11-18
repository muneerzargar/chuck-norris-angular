import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap, map} from 'rxjs/operators';
import { IResponse, IJokeItem } from '../interfaces/CN.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getfavoriteOnInterval(): Observable<{}> {
    return timer(0, environment.favoriteJokesApiConfig.interval).pipe(switchMap(() => {
      return this.http.get(environment.favoriteJokesApiConfig.uri);
    }));
  }

  getJokes(): Observable<IJokeItem[]> {
    return this.http.get(environment.jokesApiConfig.uri).pipe(
      map((result: IResponse) => {
        console.log(result);
        const {value} = result;
        return value.map((item) => {
          const newItem = {...item};
          newItem.buttonLabel = 'Add to Favorites';
          newItem.type = 'favorite';
          return newItem;
        });
      })
    );
  }

}
