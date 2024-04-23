import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { autoLogin } from './auth/data-access/store/action/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Lets Cook';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
  }
}
