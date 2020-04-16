import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmdialodComponent } from './confirmdialod.component';

describe('ConfirmdialodComponent', () => {
  let component: ConfirmdialodComponent;
  let fixture: ComponentFixture<ConfirmdialodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmdialodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmdialodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
