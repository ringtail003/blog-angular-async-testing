import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CounterService } from 'src/app/counter.service';

describe('tick', () => {
  let sut: CounterService;

  beforeEach(() => {
    sut = TestBed.inject(CounterService);
  });

  it('pass - resolve後の非同期処理', fakeAsync(() => {
    const sut = TestBed.inject(CounterService);
    sut.countUpByPromise();

    tick();
    expect(sut.value).toBe(1);
  }));

  it('pass - setTimeout後の非同期処理', fakeAsync(() => {
    const sut = TestBed.inject(CounterService);
    sut.countUpBySetTimeout(0);

    tick();
    expect(sut.value).toBe(1);
  }));

  it('pass - ネストしたタスクキューを実行する（デフォルト）', fakeAsync(() => {
    const sut = TestBed.inject(CounterService);
    setTimeout(() => sut.countUpBySetTimeout(0));

    tick();
    expect(sut.value).toBe(1);
  }));

  it('pass - ネストしたタスクキューを実行しない', fakeAsync(() => {
    const sut = TestBed.inject(CounterService);
    setTimeout(() => sut.countUpBySetTimeout(0));

    tick(0, { processNewMacroTasksSynchronously: false });
    expect(sut.value).toBe(0);
    tick();
  }));
});
