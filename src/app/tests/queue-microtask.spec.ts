import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CounterService } from 'src/app/counter.service';

describe('queueMicrotask', () => {
  let sut: CounterService;

  beforeEach(() => {
    sut = TestBed.inject(CounterService);
  });

  describe('queueMicrotask後の非同期処理', () => {
    xit('failed', () => {
      sut.countUpByQueueMicrotask();
      expect(sut.value).toBe(1);
    });

    it('pass', fakeAsync(() => {
      const sut = TestBed.inject(CounterService);
      sut.countUpByQueueMicrotask();
      tick();
      expect(sut.value).toBe(1);
    }));
  });
});
