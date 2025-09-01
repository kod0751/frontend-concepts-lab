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

export default function CounterPage() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            ← 홈으로 돌아가기
          </Link>
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-3 h-8 rounded-full bg-gradient-to-b from-primary to-primary/60"></div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Zustand Counter
              </h1>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Zustand를 사용한 간단한 카운터 구현
            </p>
            <div className="flex gap-3 mt-6">
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

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>카운터</CardTitle>
            <CardDescription>
              버튼을 클릭하여 카운터 값을 변경해보세요
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl font-bold text-primary">{count}</div>
            <div className="flex gap-4 justify-center">
              <Button onClick={decrement} variant="outline">
                -1
              </Button>
              <Button onClick={reset} variant="secondary">
                Reset
              </Button>
              <Button onClick={increment}>+1</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
