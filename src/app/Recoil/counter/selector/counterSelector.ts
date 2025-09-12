import { selector } from 'recoil';
import { counterState } from '../atom/counterAtom';

export const doubleCounterState = selector<number>({
  key: 'doubleCounterState',
  get: ({ get }) => {
    const count = get(counterState);
    return count * 2;
  },
});

export const isEvenState = selector<boolean>({
  key: 'isEvenState',
  get: ({ get }) => {
    const count = get(counterState);
    return count % 2 === 0;
  },
});
