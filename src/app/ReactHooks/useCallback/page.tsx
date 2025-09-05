'use client';

import { useState, useCallback, memo } from 'react';
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
import { Zap, List } from 'lucide-react';

// 메모이제이션된 자식 컴포넌트
const MemoizedChild = memo(
  ({ onClick, label }: { onClick: () => void; label: string }) => {
    console.log(`${label} component rendered`);

    return (
      <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
        <p className="text-sm font-medium mb-2">{label}</p>
        <Button onClick={onClick} size="sm">
          클릭 카운트 증가
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          콘솔을 확인하여 렌더링 횟수를 확인해보세요
        </p>
      </div>
    );
  }
);

MemoizedChild.displayName = 'MemoizedChild';

// 일반 자식 컴포넌트 (비교용)
const RegularChild = ({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) => {
  console.log(` ${label} component rendered`);

  return (
    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
      <p className="text-sm font-medium mb-2 text-destructive">{label}</p>
      <Button onClick={onClick} size="sm" variant="destructive">
        클릭 카운트 증가
      </Button>
      <p className="text-xs text-muted-foreground mt-2">
        콘솔을 확인하여 렌더링 횟수를 확인해보세요
      </p>
    </div>
  );
};

export default function UseCallbackExample() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState<string[]>([]);

  // useCallback으로 최적화된 함수
  const optimizedIncrement1 = useCallback(() => {
    setCount1((prev) => prev + 1);
  }, []);

  const optimizedIncrement2 = useCallback(() => {
    setCount2((prev) => prev + 1);
  }, []);

  // 최적화되지 않은 함수 (매번 새로 생성됨)
  const regularIncrement1 = () => {
    setCount1((prev) => prev + 1);
  };

  const regularIncrement2 = () => {
    setCount2((prev) => prev + 1);
  };

  // 아이템 추가 함수
  const addItem = useCallback(() => {
    if (inputValue.trim()) {
      setItems((prev) => [...prev, inputValue.trim()]);
      setInputValue('');
    }
  }, [inputValue]);

  // 아이템 삭제 함수
  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container font-['NanumSquareNeo'] mx-auto px-4 py-12 max-w-4xl">
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
                useCallback Hook
              </h1>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              useCallback은 함수를 메모이제이션하여 불필요한 리렌더링을
              방지합니다. React.memo와 함께 사용하면 효과적입니다.
            </p>
            <div className="flex gap-3 mt-6">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20"
              >
                React Hooks
              </Badge>
              <Badge
                variant="secondary"
                className="bg-accent/10 text-accent border-accent/20"
              >
                Optimization
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 실습 영역 */}
          <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  useCallback 비교 실습
                </CardTitle>
                <CardDescription>
                  최적화된 컴포넌트와 일반 컴포넌트의 렌더링 차이를
                  확인해보세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Count 1: {count1}
                    </p>
                    <MemoizedChild
                      onClick={optimizedIncrement1}
                      label="최적화된 컴포넌트"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Count 2: {count2}
                    </p>
                    <RegularChild
                      onClick={regularIncrement2}
                      label="일반 컴포넌트"
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    💡 개발자 도구의 콘솔을 열고 버튼을 클릭해보세요. 최적화된
                    컴포넌트는 관련 없는 상태 변경 시 리렌더링되지 않습니다.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="w-5 h-5 text-primary" />
                  동적 리스트 관리
                </CardTitle>
                <CardDescription>
                  useCallback을 사용한 효율적인 리스트 관리 예제입니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="아이템을 입력하세요..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                    className="bg-white"
                  />
                  <Button onClick={addItem}>추가</Button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted/50 rounded"
                    >
                      <span className="text-sm">{item}</span>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeItem(index)}
                      >
                        삭제
                      </Button>
                    </div>
                  ))}
                </div>

                {items.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    아이템을 추가해보세요
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 코드 예제 */}
          <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>코드 예제</CardTitle>
                <CardDescription>
                  useCallback 사용법과 최적화 효과를 확인해보세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="text-sm bg-muted/50 p-4 rounded-lg overflow-x-auto">
                  <code>{`// useCallback으로 최적화된 함수
const optimizedIncrement = useCallback(() => {
  setCount(prev => prev + 1)
}, []) // 의존성이 없으므로 한 번만 생성

// 최적화되지 않은 함수 (매번 새로 생성됨)
const regularIncrement = () => {
  setCount(prev => prev + 1)
}

// 메모이제이션된 자식 컴포넌트
const MemoizedChild = memo(({ onClick }) => {
  // onClick이 같은 참조면 리렌더링 안됨
  return <button onClick={onClick}>클릭</button>
})`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>성능 최적화 가이드</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                    ✅ 언제 사용하나요?
                  </p>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• 자식 컴포넌트에 props로 전달되는 함수</li>
                    <li>• useEffect의 의존성으로 사용되는 함수</li>
                    <li>• 비용이 많이 드는 함수 생성</li>
                  </ul>
                </div>

                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                    ⚠️ 주의사항
                  </p>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>• React.memo와 함께 사용해야 효과적</li>
                    <li>• 의존성 배열을 정확히 설정</li>
                    <li>• 모든 함수에 사용하면 오히려 성능 저하</li>
                  </ul>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                    🔍 디버깅 팁
                  </p>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• React DevTools Profiler 사용</li>
                    <li>• console.log로 렌더링 추적</li>
                    <li>• 의존성 배열 변경 모니터링</li>
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
