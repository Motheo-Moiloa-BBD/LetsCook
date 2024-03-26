import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShoppingListComponent } from './edit-shopping-list.component';

describe('EditShoppingListComponent', () => {
  let component: EditShoppingListComponent;
  let fixture: ComponentFixture<EditShoppingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditShoppingListComponent]
    });
    fixture = TestBed.createComponent(EditShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
