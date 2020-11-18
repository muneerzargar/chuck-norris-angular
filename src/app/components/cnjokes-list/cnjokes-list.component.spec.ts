import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CNJokesListComponent } from './cnjokes-list.component';

describe('CNJokesListComponent', () => {
  let component: CNJokesListComponent;
  let fixture: ComponentFixture<CNJokesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CNJokesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CNJokesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
