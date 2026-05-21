import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingGit } from './testing-git';

describe('TestingGit', () => {
  let component: TestingGit;
  let fixture: ComponentFixture<TestingGit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingGit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingGit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
