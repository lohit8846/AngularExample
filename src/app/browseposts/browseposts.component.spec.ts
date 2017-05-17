import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsepostsComponent } from './browseposts.component';

describe('BrowsepostsComponent', () => {
  let component: BrowsepostsComponent;
  let fixture: ComponentFixture<BrowsepostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsepostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsepostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
