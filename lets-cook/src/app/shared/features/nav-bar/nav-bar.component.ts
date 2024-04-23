import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../../data-access/services/data-storage.service';
import { AuthService } from 'src/app/auth/data-access/services/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/auth/data-access/store/selector/auth.selectors';

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
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store.select(selectUser).subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.dataStorageService.saveRecipes().subscribe();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
