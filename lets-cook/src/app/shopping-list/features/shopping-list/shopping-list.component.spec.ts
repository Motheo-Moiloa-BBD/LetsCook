import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListModule } from '../../shopping-list.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ShoppingListModule, RouterTestingModule],
      declarations: [ShoppingListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
