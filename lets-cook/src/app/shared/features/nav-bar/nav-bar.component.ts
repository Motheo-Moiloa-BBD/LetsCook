import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/auth/data-access/store/selector/auth.selectors';
import { signOut } from 'src/app/auth/data-access/store/action/auth.actions';
import { fetchRecipes, storeRecipes } from 'src/app/recipe-book/data-access/store/action/recipe-book.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  private userSubscription?: Subscription;
  collapsed: boolean = true;
  isAuthenticated: boolean = false;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    // eslint-disable-next-line @ngrx/no-store-subscription
    this.userSubscription = this.store.select(selectUser).subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.store.dispatch(storeRecipes())
  }

  onFetchData() {
    this.store.dispatch(fetchRecipes())
  }

  onLogout() {
    this.store.dispatch(signOut());
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
