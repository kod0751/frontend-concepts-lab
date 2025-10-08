'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { todoListState } from './atom/todoAtom';
import { todoStatsSelector } from './seletor/todoSelector';
import { useTodoActions } from './hooks/useTodoAction';

export default function RecoilTodoListPage() {
  const todos = useRecoilValue(todoListState);
  const { total, completed, remaining } = useRecoilValue(todoStatsSelector);
  const { addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodoActions();

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground font-['NanumSquareNeo'] hover:text-primary transition-colors mb-4"
          >
            ← 홈으로 돌아가기
          </Link>
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-3 h-8 rounded-full bg-gradient-to-b from-primary to-primary/60"></div>
              <h1 className="text-4xl font-['NanumSquareNeoExtraBold'] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Zustand Todo List
              </h1>
            </div>
            <p className="text-muted-foreground text-lg font-['NanumSquareNeo'] leading-relaxed">
              Zustand를 사용하여 구현한 할 일 목록 관리 예제입니다. 상태 추가,
              완료 토글, 삭제 기능을 제공합니다.
            </p>
            <div className="flex gap-3 mt-6 font-['NanumSquareNeo']">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20"
              >
                Zustand
              </Badge>
              <Badge
                variant="secondary"
                className="bg-accent/10 text-accent border-accent/20"
              >
                State Management
              </Badge>
            </div>
          </div>
        </div>

        {/* Todo App */}
        <div className="grid gap-8">
          {/* Add Todo Form */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="font-['NanumSquareNeo']">
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />새 할 일 추가
              </CardTitle>
              <CardDescription>
                할 일을 입력하고 Enter를 누르거나 추가 버튼을 클릭하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="font-['NanumSquareNeo']">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="할 일을 입력하세요..."
                  className="flex-1 bg-white"
                />
                <Button type="submit" disabled={!inputValue.trim()}>
                  <Plus className="w-4 h-4 mr-2" />
                  추가
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Circle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="font-['NanumSquareNeo']">
                    <p className="text-2xl font-bold">{total}</p>
                    <p className="text-sm text-muted-foreground">전체 할 일</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="font-['NanumSquareNeo']">
                    <p className="text-2xl font-bold">{completed}</p>
                    <p className="text-sm text-muted-foreground">
                      완료된 할 일
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Circle className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="font-['NanumSquareNeo']">
                    <p className="text-2xl font-bold">{remaining}</p>
                    <p className="text-sm text-muted-foreground">남은 할 일</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Todo List */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 font-['NanumSquareNeo']">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>할 일 목록</CardTitle>
                <CardDescription>
                  체크박스를 클릭하여 완료 상태를 변경할 수 있습니다.
                </CardDescription>
              </div>
              {completed > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCompleted}
                  className="text-destructive hover:text-destructive bg-red-500/10 border-destructive/20 hover:bg-destructive/10"
                >
                  완료된 항목 삭제
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {todos.length === 0 ? (
                <div className="text-center py-12">
                  <Circle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    아직 할 일이 없습니다.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    위에서 새로운 할 일을 추가해보세요!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 ${
                        todo.completed
                          ? 'bg-muted/50 border-border/50'
                          : 'bg-background border-border hover:border-primary/30'
                      }`}
                    >
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(todo.id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <span
                        className={`flex-1 transition-all duration-200 ${
                          todo.completed
                            ? 'line-through text-muted-foreground'
                            : 'text-foreground'
                        }`}
                      >
                        {todo.text}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {todo.createdAt.toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 font-['NanumSquareNeo']">
            <CardHeader>
              <CardTitle>코드 예제</CardTitle>
              <CardDescription>
                Zustand를 사용한 Todo Store 구현 예제입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`const setTodos = useSetRecoilState(todoListState);
                
const addTodo = (text: string) => {
  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    completed: false,
    createdAt: new Date(),
      };
  setTodos((prev) => [...prev, newTodo]);
};
                
const toggleTodo = (id: string) => {
  setTodos((prev) =>
    prev.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
};
      
const deleteTodo = (id: string) => {
  setTodos((prev) => prev.filter((todo) => todo.id !== id));
};

const clearCompleted = () => {
  setTodos((prev) => prev.filter((todo) => !todo.completed));
};
      
return { addTodo, toggleTodo, deleteTodo, clearCompleted };
`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
