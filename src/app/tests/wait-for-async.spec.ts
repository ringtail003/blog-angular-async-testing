import { Component, OnInit } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';

@Component({
  selector: 'fake',
  template: '{{value}}',
})
export class FakeComponent implements OnInit {
  value = 0;
  constructor() {}

  ngOnInit(): void {
    Promise.resolve().then(() => this.value++);
  }
}

describe('waitForAsync', () => {
  let fixture: ComponentFixture<FakeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FakeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FakeComponent);
  });

  it('pass - tickとdetectChangesを使う', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toBe('1');
  }));

  it(
    'pass - waitForAsyncを使う',
    waitForAsync(() => {
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toBe('1');
      });
    })
  );
});
