'use client';

import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { counterState } from './atom/counterAtom';
import { doubleCounterState, isEvenState } from './selector/counterSelector';

export default function RecoilCounterPage() {
  const [count, setCount] = useRecoilState(counterState);
  const doubleCount = useRecoilValue(doubleCounterState);
  const isEven = useRecoilValue(isEvenState);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 font-['NanumSquareNeo']">
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
              <h1 className="text-4xl font-['NanumSquareNeoExtraBold'] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Recoil Counter
              </h1>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Recoil을 사용하여 구현한 간단한 카운터 예제입니다. 전역 상태
              관리의 기본을 경험해보세요.
            </p>
            <div className="flex gap-3 mt-6">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20"
              >
                Recoil
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

        {/* Counter App */}
        <div className="grid gap-8">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
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
              <div className="text-lg text-muted-foreground">
                2배 값: <span className="font-semibold">{doubleCount}</span>
              </div>
              <div className="text-lg text-muted-foreground">
                짝수 여부:{' '}
                <span className="font-semibold">
                  {isEven ? '짝수' : '홀수'}
                </span>
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

          {/* Code Example */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>코드 예제</CardTitle>
              <CardDescription>
                Recoil을 사용한 상태 관리 구현입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`const counterState = atom<number>({
  key: "counterState",
  default: 0,
})

function Counter() {
  const [count, setCount] = useRecoilState(counterState)

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
