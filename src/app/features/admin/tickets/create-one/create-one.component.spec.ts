import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOneComponent } from './create-one.component';

describe('CreateOneComponent', () => {
  let component: CreateOneComponent;
  let fixture: ComponentFixture<CreateOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
