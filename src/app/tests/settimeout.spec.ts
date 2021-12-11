import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CounterService } from 'src/app/counter.service';

describe('setTimeout', () => {
  let sut: CounterService;

  beforeEach(() => {
    sut = TestBed.inject(CounterService);
  });

  describe('0ミリ秒後', () => {
    xit('failed', () => {
      sut.countUpBySetTimeout(0);
      expect(sut.value).toBe(1);
    });

    it('pass', fakeAsync(() => {
      sut.countUpBySetTimeout(0);
      tick();
      expect(sut.value).toBe(1);
    }));
  });

  describe('5ミリ秒後', () => {
    xit('failed', fakeAsync(() => {
      sut.countUpBySetTimeout(5);
      tick();
      expect(sut.value).toBe(1);
    }));

    it('pass', fakeAsync(() => {
      sut.countUpBySetTimeout(5);
      tick(5);
      expect(sut.value).toBe(1);
    }));
  });
});
