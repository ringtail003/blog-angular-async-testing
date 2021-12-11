import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CounterService } from 'src/app/counter.service';

describe('Promise', () => {
  let sut: CounterService;

  beforeEach(() => {
    sut = TestBed.inject(CounterService);
  });

  describe('resolve後の非同期処理', () => {
    xit('failed', () => {
      sut.countUpByPromise();
      expect(sut.value).toBe(1);
    });

    it('pass', fakeAsync(() => {
      sut.countUpByPromise();
      tick();
      expect(sut.value).toBe(1);
    }));
  });
});
