import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CounterService } from 'src/app/counter.service';

describe('Observable', () => {
  let sut: CounterService;

  beforeEach(() => {
    sut = TestBed.inject(CounterService);
  });

  describe('complete後の非同期処理', () => {
    xit('failed', () => {
      sut.countUpByObservable();
      expect(sut.value).toBe(1);
    });

    it('pass', fakeAsync(() => {
      const sut = TestBed.inject(CounterService);
      sut.countUpByObservable();
      tick();
      expect(sut.value).toBe(1);
    }));
  });
});
