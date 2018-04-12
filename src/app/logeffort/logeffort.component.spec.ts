import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogeffortComponent } from './logeffort.component';

describe('LogeffortComponent', () => {
  let component: LogeffortComponent;
  let fixture: ComponentFixture<LogeffortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogeffortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogeffortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
