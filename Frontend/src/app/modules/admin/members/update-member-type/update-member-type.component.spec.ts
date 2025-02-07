import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMemberTypeComponent } from './update-member-type.component';

describe('UpdateMemberTypeComponent', () => {
  let component: UpdateMemberTypeComponent;
  let fixture: ComponentFixture<UpdateMemberTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMemberTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateMemberTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
