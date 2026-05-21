import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Saqibpagetest } from './saqibpagetest';

describe('Saqibpagetest', () => {
  let component: Saqibpagetest;
  let fixture: ComponentFixture<Saqibpagetest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Saqibpagetest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Saqibpagetest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
