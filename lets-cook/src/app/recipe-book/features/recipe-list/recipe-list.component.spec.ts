import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipeListComponent } from './recipe-list.component';
import { RecipeBookModule } from '../../recipe-book.module';
import { RouterModule } from '@angular/router';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RecipeBookModule, RouterModule.forRoot([])],
      declarations: [RecipeListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
