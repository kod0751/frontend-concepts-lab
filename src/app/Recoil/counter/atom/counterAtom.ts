import { atom } from 'recoil';

export const counterState = atom<number>({
  key: 'counterState', // 전역에서 고유해야 함
  default: 0, // 초기값
});
