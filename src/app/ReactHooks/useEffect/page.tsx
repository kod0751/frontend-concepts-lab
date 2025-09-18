'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';

interface UserData {
  id: number;
  name: string;
  email: string;
  timestamp: string;
}

export default function UseEffectPage() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds]);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        // 가상의 검색 결과
        const mockResults = [
          `${searchTerm}에 대한 결과 1`,
          `${searchTerm}에 대한 결과 2`,
          `${searchTerm}에 대한 결과 3`,
        ];
        setSearchResults(mockResults);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    console.log('[v0] Component mounted!');

    return () => {
      console.log('[v0] Component will unmount!');
    };
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      // 가상의 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUserData({
        id: Math.floor(Math.random() * 1000),
        name: '홍길동',
        email: 'hong@example.com',
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container font-['NanumSquareNeo'] mx-auto px-4 py-8">
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
              <div className="w-3 h-8 rounded-full bg-gradient-to-b from-primary to-primary/60"></div>
              <h1 className="text-4xl font-['NanumSquareNeoExtraBold'] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                useEffect Hook
              </h1>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              useEffect는 렌더링 이후 실행해야 할 부수효과(데이터 요청, 이벤트
              등록 등)를 처리하는 React 훅
            </p>
            <div className="flex gap-3 mt-6">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20"
              >
                React Hooks
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timer Effect */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">타이머 (Interval)</CardTitle>
              <CardDescription>
                setInterval을 사용한 타이머 구현
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-4 font-mono">
                  {formatTime(seconds)}
                </div>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => setIsRunning(!isRunning)}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {isRunning ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    {isRunning ? '일시정지' : '시작'}
                  </Button>
                  <Button
                    onClick={resetTimer}
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                  >
                    <RotateCcw className="w-4 h-4" />
                    리셋
                  </Button>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg text-sm font-mono">
                <div className="text-muted-foreground mb-2">코드:</div>
                <div>{'useEffect(() => {'}</div>
                <div className="ml-2">
                  {'let interval = setInterval(() => {'}
                </div>
                <div className="ml-4">{'setSeconds(s => s + 1)'}</div>
                <div className="ml-2">{'}, 1000)'}</div>
                <div className="ml-2">
                  {'return () => clearInterval(interval)'}
                </div>
                <div>{'}, [isRunning])'}</div>
              </div>
            </CardContent>
          </Card>

          {/* Window Size Effect */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">윈도우 크기 감지</CardTitle>
              <CardDescription>resize 이벤트 리스너 등록/해제</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">
                  {windowSize.width} × {windowSize.height}
                </div>
                <div className="text-sm text-muted-foreground">
                  브라우저 창 크기를 조절해보세요
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg text-sm font-mono">
                <div className="text-muted-foreground mb-2">코드:</div>
                <div>{'useEffect(() => {'}</div>
                <div className="ml-2">{'const handleResize = () => {'}</div>
                <div className="ml-4">
                  {
                    'setWindowSize({width: window.innerWidth, height: window.innerHeight})'
                  }
                </div>
                <div className="ml-2">{'}'}</div>
                <div className="ml-2">
                  {"window.addEventListener('resize', handleResize)"}
                </div>
                <div className="ml-2">
                  {
                    "return () => window.removeEventListener('resize', handleResize)"
                  }
                </div>
                <div>{'}, [])'}</div>
              </div>
            </CardContent>
          </Card>

          {/* API Call Effect */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">API 호출</CardTitle>
              <CardDescription>비동기 데이터 페칭</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={fetchUserData}
                disabled={loading}
                className="w-full"
              >
                {loading ? '로딩 중...' : '사용자 데이터 가져오기'}
              </Button>

              {userData && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">
                    사용자 정보:
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>
                      <strong>ID:</strong> {userData.id}
                    </div>
                    <div>
                      <strong>이름:</strong> {userData.name}
                    </div>
                    <div>
                      <strong>이메일:</strong> {userData.email}
                    </div>
                    <div>
                      <strong>조회 시간:</strong> {userData.timestamp}
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-muted/50 p-4 rounded-lg text-sm font-mono">
                <div className="text-muted-foreground mb-2">코드:</div>
                <div>{'const fetchData = async () => {'}</div>
                <div className="ml-2">{`setLoading(true)`}</div>
                <div className="ml-2">{`const response = await fetch('/api/user')`}</div>
                <div className="ml-2">{`setUserData(await response.json())`}</div>
                <div className="ml-2">{`setLoading(false)`}</div>
                <div>{'}'}</div>
              </div>
            </CardContent>
          </Card>

          {/* Search with Debounce */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">검색 (디바운스)</CardTitle>
              <CardDescription>입력 지연 후 검색 실행</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="search">검색어를 입력하세요</Label>
                <Input
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="검색어..."
                />
              </div>

              <div className="space-y-2 max-h-32 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div key={index} className="p-2 bg-muted/50 rounded text-sm">
                    {result}
                  </div>
                ))}
                {searchTerm && searchResults.length === 0 && (
                  <div className="p-2 text-sm text-muted-foreground">
                    검색 중...
                  </div>
                )}
              </div>

              <div className="bg-muted/50 p-4 rounded-lg text-sm font-mono">
                <div className="text-muted-foreground mb-2">코드:</div>
                <div>{'useEffect(() => {'}</div>
                <div className="ml-2">
                  {'const timeoutId = setTimeout(() => {'}
                </div>
                <div className="ml-4">{'// 검색 로직'}</div>
                <div className="ml-2">{'}, 500)'}</div>
                <div className="ml-2">
                  {'return () => clearTimeout(timeoutId)'}
                </div>
                <div>{'}, [searchTerm])'}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Concepts */}
        <Card className="mt-8 bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-xl">useEffect 핵심 개념</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-primary">의존성 배열</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• [] : 마운트 시에만 실행</li>
                  <li>• [value] : value 변경 시 실행</li>
                  <li>• 없음 : 매 렌더링마다 실행</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">정리 함수</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• {'return () => {} 형태'}</li>
                  <li>• 이벤트 리스너 제거</li>
                  <li>• 타이머 정리</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">사용 사례</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• API 호출</li>
                  <li>• 이벤트 리스너 등록</li>
                  <li>• 타이머/인터벌</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
