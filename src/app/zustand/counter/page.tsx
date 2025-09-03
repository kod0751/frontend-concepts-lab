'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { useCounterStore } from './store/useCounterStore';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, RotateCcw } from 'lucide-react';

export default function CounterPage() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
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
                Zustand Counter
              </h1>
            </div>
            <p className="text-muted-foreground text-lg font-['NanumSquareNeo'] leading-relaxed">
              Zustand를 사용한 간단한 카운터 구현
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

        <Card className="mb-8 font-['NanumSquareNeo']">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              카운터
            </CardTitle>
            <CardDescription>
              버튼을 클릭하여 카운터 값을 변경해보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-8">
            <div className="text-8xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {count}
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={decrement}
                variant="outline"
                size="lg"
                className="min-w-[120px] bg-transparent"
              >
                <Minus className="w-4 h-4 mr-2" />
                감소
              </Button>
              <Button
                onClick={reset}
                variant="secondary"
                size="lg"
                className="min-w-[120px]"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                리셋
              </Button>
              <Button onClick={increment} size="lg" className="min-w-[120px]">
                <Plus className="w-4 h-4 mr-2" />
                증가
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="font-['NanumSquareNeo']">
          <CardHeader>
            <CardTitle>코드 예제</CardTitle>
            <CardDescription>
              Zustand를 사용한 상태 관리 구현입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))

// 컴포넌트에서 사용
function Counter() {
  const { count, increment, decrement, reset } = useCounterStore()
  
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
