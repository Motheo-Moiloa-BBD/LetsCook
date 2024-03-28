import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../data-access/models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeName?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipeName = this.route.snapshot.params['name'];
  }
}
