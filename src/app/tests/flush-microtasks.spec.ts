import {
  fakeAsync,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { CounterService } from 'src/app/counter.service';

describe('flushMicrotasks', () => {
  let sut: CounterService;

  beforeEach(() => {
    sut = TestBed.inject(CounterService);
  });

  describe('resolve後の非同期処理', () => {
    xit('failed', () => {
      const sut = TestBed.inject(CounterService);
      sut.countUpByPromise();

      expect(sut.value).toBe(1);
    });

    it('pass - flushMicrotasks', fakeAsync(() => {
      const sut = TestBed.inject(CounterService);
      sut.countUpByPromise();

      flushMicrotasks();
      expect(sut.value).toBe(1);
    }));

    it('failed - タスクキューは実行されない', fakeAsync(() => {
      const sut = TestBed.inject(CounterService);
      sut.countUpByPromise(); // マイクロタスクキュー
      sut.countUpBySetTimeout(0); // タスクキュー

      flushMicrotasks();
      expect(sut.value).toBe(1);

      // タスクキューに残った未実行のタスクによって "1 timer(s) still in the queue." というエラーが発生するためtickでタスクを消化する
      tick();
    }));
  });
});
