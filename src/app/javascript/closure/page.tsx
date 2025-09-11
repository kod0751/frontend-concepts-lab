'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ClosurePage() {
  const [output1, setOutput1] = useState<string[]>([]);
  const [output2, setOutput2] = useState<string[]>([]);
  const [output3, setOutput3] = useState<string[]>([]);

  // Example 1: Basic Closure
  const runExample1 = () => {
    const results: string[] = [];

    function outerFunction(x: number) {
      results.push(`외부 함수 호출: x = ${x}`);

      function innerFunction(y: number) {
        results.push(`내부 함수 호출: y = ${y}`);
        results.push(`클로저로 접근한 x + y = ${x + y}`);
        return x + y;
      }

      return innerFunction;
    }

    const addFive = outerFunction(5);
    const result = addFive(3);
    results.push(`최종 결과: ${result}`);

    setOutput1(results);
  };

  // Example 2: Counter with Closure
  const runExample2 = () => {
    const results: string[] = [];

    function createCounter() {
      let count = 0;
      results.push(`카운터 생성: count = ${count}`);

      return {
        increment: () => {
          count++;
          results.push(`increment 호출: count = ${count}`);
          return count;
        },
        decrement: () => {
          count--;
          results.push(`decrement 호출: count = ${count}`);
          return count;
        },
        getCount: () => {
          results.push(`getCount 호출: count = ${count}`);
          return count;
        },
      };
    }

    const counter1 = createCounter();
    const counter2 = createCounter();

    counter1.increment();
    counter1.increment();
    counter2.increment();

    results.push(`counter1 현재값: ${counter1.getCount()}`);
    results.push(`counter2 현재값: ${counter2.getCount()}`);

    setOutput2(results);
  };

  // Example 3: Loop with Closure Problem
  const runExample3 = () => {
    const results: string[] = [];

    results.push('❌ 잘못된 예제 (var 사용):');

    // 잘못된 예제 시뮬레이션
    const wrongFunctions: (() => void)[] = [];
    for (let i = 0; i < 3; i++) {
      wrongFunctions.push(() => {
        results.push(`잘못된 함수 ${wrongFunctions.length - 1}: i = ${i}`);
      });
    }

    results.push('✅ 올바른 예제 (let 사용 또는 IIFE):');

    // 올바른 예제 1: let 사용
    const correctFunctions: (() => void)[] = [];
    for (let j = 0; j < 3; j++) {
      correctFunctions.push(() => {
        results.push(`올바른 함수 ${correctFunctions.length - 1}: j = ${j}`);
      });
    }

    // 올바른 예제 2: IIFE 사용
    const iifeFunctions: (() => void)[] = [];
    for (let k = 0; k < 3; k++) {
      iifeFunctions.push(
        ((index) => {
          return () => {
            results.push(
              `IIFE 함수 ${iifeFunctions.length - 1}: index = ${index}`
            );
          };
        })(k)
      );
    }

    // 함수들 실행
    wrongFunctions.forEach((fn) => fn());
    correctFunctions.forEach((fn) => fn());
    iifeFunctions.forEach((fn) => fn());

    setOutput3(results);
  };

  const resetAll = () => {
    setOutput1([]);
    setOutput2([]);
    setOutput3([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container font-['NanumSquareNeo'] mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            ← 홈으로 돌아가기
          </Link>
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-3 h-8 rounded-full bg-gradient-to-b from-third to-third/60"></div>
              <h1 className="text-4xl font-['NanumSquareNeoExtraBold'] bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text text-transparent">
                JavaScript Closure
              </h1>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              JavaScript의 클로저(Closure) 개념을 실습해보세요. 함수가 선언된
              렉시컬 환경을 기억하는 특성을 다양한 예제로 학습할 수 있습니다.
            </p>
            <div className="flex gap-3 mt-6">
              <Badge className="bg-third/10 text-third border-third/20 dark:bg-third/10 dark:text-third/20">
                JavaScript
              </Badge>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="grid gap-8">
          {/* Example 1: Basic Closure */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                기본 클로저
              </CardTitle>
              <CardDescription>
                외부 함수의 변수에 접근하는 내부 함수의 클로저 동작을
                확인해보세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  {`function outerFunction(x) {
  function innerFunction(y) {
    return x + y; // 클로저: x에 접근
  }
  return innerFunction;
}

const addFive = outerFunction(5);
const result = addFive(3); // 8`}
                </pre>
              </div>

              <div className="flex gap-2">
                <Button onClick={runExample1} className="gap-2">
                  <Play className="w-4 h-4" />
                  실행
                </Button>
              </div>

              {output1.length > 0 && (
                <div className="bg-green-50/50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200/50 dark:border-green-800/50">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    실행 결과:
                  </h4>
                  <div className="space-y-1">
                    {output1.map((line, index) => (
                      <div
                        key={index}
                        className="text-sm text-green-700 dark:text-green-300 font-mono"
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Example 2: Counter with Closure */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                클로저를 활용한 카운터
              </CardTitle>
              <CardDescription>
                클로저를 사용하여 private 변수를 만들고 상태를 유지하는 방법을
                학습해보세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  {`function createCounter() {
  let count = 0; // private 변수
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter1 = createCounter();
const counter2 = createCounter(); // 독립적인 카운터`}
                </pre>
              </div>

              <div className="flex gap-2">
                <Button onClick={runExample2} className="gap-2">
                  <Play className="w-4 h-4" />
                  실행
                </Button>
              </div>

              {output2.length > 0 && (
                <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200/50 dark:border-blue-800/50">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    실행 결과:
                  </h4>
                  <div className="space-y-1">
                    {output2.map((line, index) => (
                      <div
                        key={index}
                        className="text-sm text-blue-700 dark:text-blue-300 font-mono"
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Example 3: Loop with Closure Problem */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                반복문에서의 클로저 문제
              </CardTitle>
              <CardDescription>
                반복문에서 클로저를 사용할 때 발생하는 일반적인 문제와 해결
                방법을 알아보세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  {`// ❌ 문제가 있는 코드 (var 사용)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 모두 3 출력
}

// ✅ 해결 방법 1: let 사용
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2 출력
}

// ✅ 해결 방법 2: IIFE 사용
for (var i = 0; i < 3; i++) {
  ((index) => {
    setTimeout(() => console.log(index), 100);
  })(i);
}`}
                </pre>
              </div>

              <div className="flex gap-2">
                <Button onClick={runExample3} className="gap-2">
                  <Play className="w-4 h-4" />
                  실행
                </Button>
              </div>

              {output3.length > 0 && (
                <div className="bg-purple-50/50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200/50 dark:border-purple-800/50">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    실행 결과:
                  </h4>
                  <div className="space-y-1">
                    {output3.map((line, index) => (
                      <div
                        key={index}
                        className="text-sm text-purple-700 dark:text-purple-300 font-mono"
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Reset Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={resetAll}
            variant="outline"
            className="gap-2 bg-transparent"
          >
            <RotateCcw className="w-4 h-4" />
            모든 결과 초기화
          </Button>
        </div>
      </div>
    </div>
  );
}
