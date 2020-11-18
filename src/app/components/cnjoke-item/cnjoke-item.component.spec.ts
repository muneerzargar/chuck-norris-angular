import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CNJokeItemComponent } from './cnjoke-item.component';

describe('CNJokeItemComponent', () => {
  let component: CNJokeItemComponent;
  let fixture: ComponentFixture<CNJokeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CNJokeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CNJokeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
