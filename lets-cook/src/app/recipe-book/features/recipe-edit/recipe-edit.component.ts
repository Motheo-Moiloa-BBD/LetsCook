import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  paramSubscription?: Subscription;
  id?: number;
  editMode = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.id = Number.parseInt(params['id']);
      this.editMode = params['id'] != null;
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }
}
