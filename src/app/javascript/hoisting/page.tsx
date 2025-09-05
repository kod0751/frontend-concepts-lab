'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HoistingPage() {
  const [output1, setOutput1] = useState<string[]>([]);
  const [output2, setOutput2] = useState<string[]>([]);
  const [output3, setOutput3] = useState<string[]>([]);

  // Example 1: Variable Hoisting
  const runExample1 = () => {
    const results: string[] = [];

    results.push('=== var 호이스팅 예제 ===');

    // var 호이스팅 시뮬레이션
    results.push('코드 실행 순서:');
    results.push(
      '1. console.log(x) // undefined (선언은 호이스팅, 초기화는 안됨)'
    );
    results.push('2. var x = 5');
    results.push('3. console.log(x) // 5');

    results.push('');
    results.push('실제 JavaScript 엔진이 해석하는 방식:');
    results.push('var x; // 호이스팅된 선언');
    results.push('console.log(x); // undefined');
    results.push('x = 5; // 초기화');
    results.push('console.log(x); // 5');

    results.push('');
    results.push('=== let/const vs var 비교 ===');
    results.push('var: 호이스팅되어 undefined로 초기화');
    results.push('let/const: 호이스팅되지만 TDZ(Temporal Dead Zone)에 있음');

    setOutput1(results);
  };

  // Example 2: Function Hoisting
  const runExample2 = () => {
    const results: string[] = [];

    results.push('=== 함수 호이스팅 예제 ===');

    // 함수 선언문 호이스팅
    results.push('함수 선언문은 완전히 호이스팅됩니다:');
    results.push('sayHello() 호출 가능 // "Hello!"');
    results.push('');
    results.push('function sayHello() {');
    results.push('  return "Hello!";');
    results.push('}');

    results.push('');
    results.push('=== 함수 표현식은 호이스팅되지 않음 ===');
    results.push('sayGoodbye() // TypeError: sayGoodbye is not a function');
    results.push('var sayGoodbye = function() {');
    results.push('  return "Goodbye!";');
    results.push('};');

    results.push('');
    results.push('실제 해석:');
    results.push('var sayGoodbye; // undefined로 호이스팅');
    results.push('sayGoodbye(); // undefined() 호출 시도 -> 에러');
    results.push('sayGoodbye = function() { ... };');

    setOutput2(results);
  };

  // Example 3: Practical Hoisting Examples
  const runExample3 = () => {
    const results: string[] = [];

    results.push('=== 실제 코드에서의 호이스팅 ===');

    // 예제 1: 변수와 함수 이름 충돌
    results.push('1. 변수와 함수 이름이 같을 때:');
    results.push('console.log(typeof foo); // "function"');
    results.push('var foo = "variable";');
    results.push('function foo() { return "function"; }');
    results.push('console.log(typeof foo); // "string"');

    results.push('');
    results.push('해석 순서:');
    results.push('function foo() { ... } // 함수 선언 호이스팅');
    results.push('var foo; // 변수 선언 (이미 foo가 있으므로 무시)');
    results.push('console.log(typeof foo); // "function"');
    results.push('foo = "variable"; // 변수 할당');
    results.push('console.log(typeof foo); // "string"');

    results.push('');
    results.push('2. 블록 스코프에서의 호이스팅:');
    results.push('var x = 1;');
    results.push('if (true) {');
    results.push('  console.log(x); // undefined (내부 var x가 호이스팅)');
    results.push('  var x = 2;');
    results.push('}');

    results.push('');
    results.push('3. 모범 사례:');
    results.push('- 변수는 사용하기 전에 선언하고 초기화');
    results.push('- let/const 사용으로 호이스팅 문제 방지');
    results.push('- 함수는 사용하기 전에 정의');

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
                JavaScript Hoisting
              </h1>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              JavaScript의 호이스팅(Hoisting) 개념을 실습해보세요. 변수와 함수
              선언이 스코프의 최상단으로 끌어올려지는 동작을 학습할 수 있습니다.
            </p>
            <div className="flex gap-3 mt-6">
              <Badge className="bg-yellow-100/10 text-yellow-600 border-yellow-200/20 dark:bg-yellow-900/10 dark:text-yellow-400">
                JavaScript
              </Badge>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="grid gap-8">
          {/* Example 1: Variable Hoisting */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                변수 호이스팅
              </CardTitle>
              <CardDescription>
                var, let, const의 호이스팅 동작 차이를 알아보세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  {`console.log(x); // undefined (호이스팅)
var x = 5;
console.log(x); // 5

// 실제 해석:
// var x; (호이스팅)
// console.log(x); // undefined
// x = 5;
// console.log(x); // 5

console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;`}
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
                    설명:
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

          {/* Example 2: Function Hoisting */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                함수 호이스팅
              </CardTitle>
              <CardDescription>
                함수 선언문과 함수 표현식의 호이스팅 차이를 학습해보세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  {`// 함수 선언문 - 완전히 호이스팅됨
sayHello(); // "Hello!" (정상 동작)

function sayHello() {
  return "Hello!";
}

// 함수 표현식 - 변수만 호이스팅됨
sayGoodbye(); // TypeError: sayGoodbye is not a function

var sayGoodbye = function() {
  return "Goodbye!";
};`}
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
                    설명:
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

          {/* Example 3: Practical Examples */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                실제 사례와 주의점
              </CardTitle>
              <CardDescription>
                실제 개발에서 마주칠 수 있는 호이스팅 관련 문제와 해결 방법을
                알아보세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  {`// 변수와 함수 이름 충돌
console.log(typeof foo); // "function"
var foo = "variable";
function foo() { return "function"; }
console.log(typeof foo); // "string"

// 블록 스코프에서의 호이스팅
var x = 1;
if (true) {
  console.log(x); // undefined
  var x = 2;
}

// 모범 사례: let/const 사용
let y = 1;
if (true) {
  console.log(y); // 1 (예상대로 동작)
  let z = 2;
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
                    설명:
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
