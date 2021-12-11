import {
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { CounterService } from 'src/app/counter.service';

describe('Error: still in queue', () => {
  let sut: CounterService;

  beforeEach(() => {
    sut = TestBed.inject(CounterService);
  });

  describe('setTimeout後の非同期処理', () => {
    xit('failed - still in the queue', fakeAsync(() => {
      const sut = TestBed.inject(CounterService);
      sut.countUpBySetTimeout(0);

      tick();
      expect(sut.value).toBe(1);

      sut.countUpBySetTimeout(0);

      // Error: 1 timer(s) still in the queue.
    }));

    it('pass', fakeAsync(() => {
      const sut = TestBed.inject(CounterService);
      sut.countUpBySetTimeout(0);

      tick();
      expect(sut.value).toBe(1);

      sut.countUpBySetTimeout(0);

      tick();
    }));

    xit('failed - periodic timer(s) still in the queue', fakeAsync(() => {
      sut.countUpBySetInterval();
      tick(1000);

      expect(sut.value).toBe(1);

      // Error: 1 periodic timer(s) still in the queue.
    }));

    it('pass', fakeAsync(() => {
      sut.countUpBySetInterval();
      tick(1000);

      expect(sut.value).toBe(1);
      discardPeriodicTasks();
    }));
  });
});
