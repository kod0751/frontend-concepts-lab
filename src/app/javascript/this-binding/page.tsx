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

export default function ThisBindingPage() {
  const [output1, setOutput1] = useState<string[]>([]);
  const [output2, setOutput2] = useState<string[]>([]);
  const [output3, setOutput3] = useState<string[]>([]);

  // Example 1: Regular Function vs Arrow Function
  const runExample1 = () => {
    const results: string[] = [];

    results.push('=== 일반 함수 vs 화살표 함수 ===');

    // 일반 함수에서의 this
    results.push('1. 일반 함수에서의 this:');
    results.push('const obj = {');
    results.push('  name: "객체",');
    results.push('  regularFunc: function() {');
    results.push('    return this.name; // this는 obj를 가리킴');
    results.push('  }');
    results.push('};');
    results.push('obj.regularFunc() // "객체"');

    results.push('');
    results.push('2. 화살표 함수에서의 this:');
    results.push('const obj = {');
    results.push('  name: "객체",');
    results.push('  arrowFunc: () => {');
    results.push('    return this.name; // this는 상위 스코프를 가리킨다');
    results.push('  }');
    results.push('};');
    results.push('obj.arrowFunc() // undefined (전역 객체의 name)');

    results.push('');
    results.push('핵심 차이점:');
    results.push('- 일반 함수: 호출 방식에 따라 this가 동적으로 결정');
    results.push(
      '- 화살표 함수: 선언 시점의 상위 스코프 this를 사용 (렉시컬 this)'
    );

    setOutput1(results);
  };

  // Example 2: Method Context Loss
  const runExample2 = () => {
    const results: string[] = [];

    results.push('=== 메서드 컨텍스트 손실 문제 ===');

    results.push('문제 상황:');
    results.push('const person = {');
    results.push('  name: "홍길동",');
    results.push('  greet: function() {');
    results.push('    console.log(`안녕하세요, ${this.name}입니다.`);');
    results.push('  }');
    results.push('};');
    results.push('');
    results.push('const greetFunc = person.greet;');
    results.push('greetFunc(); // "안녕하세요, undefined입니다."');
    results.push('// this가 전역 객체를 가리키게 됨');

    results.push('');
    results.push('해결 방법 1: bind() 사용');
    results.push('const boundGreet = person.greet.bind(person);');
    results.push('boundGreet(); // "안녕하세요, 홍길동입니다."');

    results.push('');
    results.push('해결 방법 2: 화살표 함수 사용');
    results.push('const person = {');
    results.push('  name: "홍길동",');
    results.push('  greet: function() {');
    results.push('    setTimeout(() => {');
    results.push('      console.log(`안녕하세요, ${this.name}입니다.`);');
    results.push('    }, 1000);');
    results.push('  }');
    results.push('};');
    results.push('// 화살표 함수는 상위 스코프의 this를 유지');

    results.push('');
    results.push('해결 방법 3: call/apply 사용');
    results.push('greetFunc.call(person); // "안녕하세요, 홍길동입니다."');
    results.push('greetFunc.apply(person); // "안녕하세요, 홍길동입니다."');

    setOutput2(results);
  };

  // Example 3: Class and Event Handlers
  const runExample3 = () => {
    const results: string[] = [];

    results.push('=== 클래스와 이벤트 핸들러에서의 this ===');

    results.push('1. 클래스 메서드에서의 this 바인딩:');
    results.push('class Counter {');
    results.push('  constructor() {');
    results.push('    this.count = 0;');
    results.push('  }');
    results.push('');
    results.push('  // 일반 메서드 - this 바인딩 필요');
    results.push('  increment() {');
    results.push('    this.count++;');
    results.push('  }');
    results.push('');
    results.push('  // 화살표 함수 - 자동으로 this 바인딩');
    results.push('  incrementArrow = () => {');
    results.push('    this.count++;');
    results.push('  }');
    results.push('}');

    results.push('');
    results.push('2. React에서의 이벤트 핸들러:');
    results.push('class Button extends React.Component {');
    results.push('  handleClick() {');
    results.push('    console.log(this); // undefined (바인딩 필요)');
    results.push('  }');
    results.push('');
    results.push('  // 해결 방법 1: 생성자에서 바인딩');
    results.push('  constructor() {');
    results.push('    this.handleClick = this.handleClick.bind(this);');
    results.push('  }');
    results.push('');
    results.push('  // 해결 방법 2: 화살표 함수 사용 (권장)');
    results.push('  handleClick = () => {');
    results.push('    console.log(this); // 컴포넌트 인스턴스');
    results.push('  }');
    results.push('}');

    results.push('');
    results.push('3. 실전 팁:');
    results.push('- 이벤트 핸들러는 화살표 함수로 정의');
    results.push('- 콜백 함수에서 this가 필요하면 화살표 함수 사용');
    results.push('- bind()는 성능 오버헤드가 있으므로 생성자에서 한 번만 호출');

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
                this 바인딩 / 화살표 함수
              </h1>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              JavaScript의 this 키워드와 화살표 함수의 동작 방식을 학습해보세요.
              일반 함수와 화살표 함수의 차이점, 그리고 실전에서 자주 마주치는
              this 바인딩 문제와 해결 방법을 알아봅니다.
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
          {/* Example 1: Regular Function vs Arrow Function */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                일반 함수 vs 화살표 함수
              </CardTitle>
              <CardDescription>
                일반 함수와 화살표 함수에서 this가 어떻게 다르게 동작하는지
                알아보세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  {`// 일반 함수: this는 호출 방식에 따라 결정
const obj = {
  name: "객체",
  regularFunc: function() {
    return this.name; // this는 obj
  }
};
console.log(obj.regularFunc()); // "객체"

// 화살표 함수: this는 상위 스코프를 따름
const obj2 = {
  name: "객체2",
  arrowFunc: () => {
    return this.name; // this는 전역 객체
  }
};
console.log(obj2.arrowFunc()); // undefined`}
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

          {/* Example 2: Method Context Loss */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                메서드 컨텍스트 손실
              </CardTitle>
              <CardDescription>
                메서드를 변수에 할당할 때 발생하는 this 바인딩 문제와 해결
                방법을 학습해보세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  {`const person = {
  name: "홍길동",
  greet: function() {
    console.log(\`안녕하세요, \${this.name}입니다.\`);
  }
};

// 문제: this 컨텍스트 손실
const greetFunc = person.greet;
greetFunc(); // "안녕하세요, undefined입니다."

// 해결 1: bind() 사용
const boundGreet = person.greet.bind(person);
boundGreet(); // "안녕하세요, 홍길동입니다."

// 해결 2: 화살표 함수 사용
setTimeout(() => {
  person.greet(); // this가 유지됨
}, 1000);`}
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

          {/* Example 3: Class and Event Handlers */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                클래스와 이벤트 핸들러
              </CardTitle>
              <CardDescription>
                클래스 메서드와 React 이벤트 핸들러에서 this를 올바르게 사용하는
                방법을 알아보세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  {`class Counter {
  constructor() {
    this.count = 0;
  }

  // 일반 메서드 - this 바인딩 필요
  increment() {
    this.count++;
  }

  // 화살표 함수 - 자동 바인딩 (권장)
  incrementArrow = () => {
    this.count++;
  }
}

// React 컴포넌트에서
class Button extends React.Component {
  // 방법 1: 생성자에서 바인딩
  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }

  // 방법 2: 화살표 함수 사용 (권장)
  handleClick = () => {
    console.log(this); // 컴포넌트 인스턴스
  }
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
