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
import { ArrowLeft } from 'lucide-react';
import { useCounterStore } from './store/counterStore';

export default function CounterPage() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Link>
        </div>

        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Counter (Zustand Style)</CardTitle>
              <CardDescription>
                간단한 카운터 예제입니다. Zustand로 상태를 관리합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold text-primary">{count}</div>
              <div className="flex gap-4 justify-center">
                <Button onClick={decrement} variant="outline" size="lg">
                  -1
                </Button>
                <Button onClick={reset} variant="secondary" size="lg">
                  Reset
                </Button>
                <Button onClick={increment} size="lg">
                  +1
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
