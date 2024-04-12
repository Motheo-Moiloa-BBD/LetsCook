import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../../data-access/services/data-storage.service';
import { Recipe } from 'src/app/recipe-book/data-access/models/recipe.model';
import { AuthService } from 'src/app/auth/data-access/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  private userSubscription?: Subscription;
  collapsed = true;
  isAuthenticated: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.$user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.dataStorageService.saveRecipes().subscribe((recipes: Recipe[]) => {
      console.log(recipes);
    });
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
