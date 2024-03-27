import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipeListComponent } from './recipe-list.component';
import { RecipeBookModule } from '../../recipe-book.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RecipeBookModule, RouterTestingModule],
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
