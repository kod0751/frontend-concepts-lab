import { atom } from 'recoil';
import { Todo } from '../type/todoType';

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});
