import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditShoppingListComponent } from './edit-shopping-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('EditShoppingListComponent', () => {
  let component: EditShoppingListComponent;
  let fixture: ComponentFixture<EditShoppingListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [EditShoppingListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
