import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { CounterService } from 'src/app/counter.service';

describe('flush', () => {
  let sut: CounterService;

  beforeEach(() => {
    sut = TestBed.inject(CounterService);
  });

  describe('setTimeout後の非同期処理', () => {
    xit('failed', () => {
      const sut = TestBed.inject(CounterService);
      sut.countUpBySetTimeout(0);

      expect(sut.value).toBe(1);
    });

    it('pass - タスクキューが実行される', fakeAsync(() => {
      const sut = TestBed.inject(CounterService);
      sut.countUpBySetTimeout(0);

      flush();
      expect(sut.value).toBe(1);
    }));

    it('pass - マイクロタスクキューも実行される', fakeAsync(() => {
      const sut = TestBed.inject(CounterService);
      sut.countUpByPromise();
      sut.countUpBySetTimeout(0);

      flush();
      expect(sut.value).toBe(2);
    }));
  });
});
