import { Injectable } from '@angular/core';
import { asyncScheduler, observeOn, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CounterService {
  value = 0;

  countUpBySetTimeout(ms: number): void {
    setTimeout(() => this.value++, ms);
  }

  countUpByPromise(): void {
    Promise.resolve().then(() => this.value++);
  }

  countUpByObservable(): void {
    const subject$ = new Subject();

    subject$.pipe(observeOn(asyncScheduler)).subscribe({
      complete: () => this.value++,
    });

    subject$.complete();
  }

  countUpByQueueMicrotask(): void {
    queueMicrotask(() => this.value++);
  }

  countUpBySetInterval(): void {
    setInterval(() => this.value++, 1000);
  }
}
