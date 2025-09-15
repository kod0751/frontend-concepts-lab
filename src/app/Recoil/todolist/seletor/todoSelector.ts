import { selector } from 'recoil';
import { todoListState } from '../atom/todoAtom';

export const completedTodosSelector = selector({
  key: 'completedTodosSelector',
  get: ({ get }) => {
    const todos = get(todoListState);
    return todos.filter((todo) => todo.completed);
  },
});

export const remainingTodosSelector = selector({
  key: 'remainingTodosSelector',
  get: ({ get }) => {
    const todos = get(todoListState);
    return todos.filter((todo) => !todo.completed);
  },
});

export const todoStatsSelector = selector({
  key: 'todoStatsSelector',
  get: ({ get }) => {
    const todos = get(todoListState);
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const remaining = total - completed;
    return { total, completed, remaining };
  },
});
