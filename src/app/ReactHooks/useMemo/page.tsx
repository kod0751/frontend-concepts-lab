'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// 무거운 계산을 시뮬레이션하는 함수
const expensiveCalculation = (num: number) => {
  console.log('Expensive calculation running...');
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += num;
  }
  return result;
};

// 필터링 함수
const filterItems = (items: string[], searchTerm: string) => {
  console.log('Filtering items...');
  return items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const items = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Honeydew',
  'Kiwi',
  'Lemon',
  'Mango',
  'Orange',
  'Papaya',
  'Quince',
  'Raspberry',
];

export default function UseMemoExample() {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [renderCount, setRenderCount] = useState(0);

  // useMemo를 사용한 최적화된 계산
  const expensiveValue = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);

  // useMemo를 사용한 최적화된 필터링
  const filteredItems = useMemo(() => {
    return filterItems(items, searchTerm);
  }, [searchTerm]);

  // 비교를 위한 useMemo 없는 버전 (매번 계산됨)
  const nonOptimizedValue = expensiveCalculation(count);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground font-['NanumSquareNeo'] hover:text-primary transition-colors mb-4"
          >
            ← 홈으로 돌아가기
          </Link>
          <div className="bg-card/50 font-['NanumSquareNeo'] backdrop-blur-sm rounded-2xl p-6 border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-8 rounded-full bg-gradient-to-b from-secondary to-secondary/60"></div>
              <h1 className="text-4xl font-['NanumSquareNeoExtraBold'] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                useMemo Hook 예제
              </h1>
            </div>
            <p className="text-muted-foreground ">
              useMemo는 비용이 많이 드는 계산의 결과를 메모이제이션하여 성능을
              최적화합니다.
            </p>
            <div className="flex gap-3 mt-6">
              <Badge
                variant="secondary"
                className="bg-accent/10 text-accent border-accent/20"
              >
                react Hooks
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-['NanumSquareNeo']">
          <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>useMemo</CardTitle>
                <CardDescription>
                  카운터 값이 변경될 때만 무거운 계산이 실행됩니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button onClick={() => setCount(count + 1)}>
                    카운트 증가: {count}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setRenderCount(renderCount + 1)}
                  >
                    리렌더링 강제: {renderCount}
                  </Button>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">
                    useMemo로 최적화된 값:
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {expensiveValue}
                  </p>
                </div>

                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-sm font-medium mb-2 text-destructive">
                    최적화되지 않은 값 (매번 계산):
                  </p>
                  <p className="text-2xl font-bold text-destructive">
                    {nonOptimizedValue}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>검색 필터링 예제</CardTitle>
                <CardDescription>
                  검색어가 변경될 때만 필터링이 실행됩니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="과일 이름을 검색해보세요..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white"
                />

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">
                    필터링된 결과 ({filteredItems.length}개):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {filteredItems.map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 코드 예제 */}
          <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>코드 예제</CardTitle>
                <CardDescription>
                  useMemo 사용법과 최적화 효과를 확인해보세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="text-sm bg-muted/50 p-4 rounded-lg overflow-x-auto">
                  <code>{`// 무거운 계산을 useMemo로 최적화
const expensiveValue = useMemo(() => {
  return expensiveCalculation(count)
}, [count]) // count가 변경될 때만 재계산

// 필터링을 useMemo로 최적화
const filteredItems = useMemo(() => {
  return filterItems(items, searchTerm)
}, [searchTerm]) // searchTerm이 변경될 때만 재계산

// 최적화되지 않은 버전 (매번 계산됨)
const nonOptimizedValue = expensiveCalculation(count)`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>성능 최적화 팁</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                    ✅ 언제 사용하나요?
                  </p>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• 비용이 많이 드는 계산</li>
                    <li>• 복잡한 객체나 배열 생성</li>
                    <li>• 의존성이 자주 변경되지 않는 경우</li>
                  </ul>
                </div>

                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                    ⚠️ 주의사항
                  </p>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>• 간단한 계산에는 오버헤드</li>
                    <li>• 의존성 배열을 정확히 설정</li>
                    <li>• 메모리 사용량 증가 고려</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
