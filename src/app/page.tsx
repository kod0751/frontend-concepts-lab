import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const examples = [
  {
    title: 'Counter',
    description: 'Zustand를 사용한 간단한 카운터 예제',
    path: '/zustand/counter',
    category: 'State Management',
    tech: 'Zustand',
  },
  {
    title: 'Todo List',
    description: 'Zustand로 구현한 할 일 목록 관리',
    path: '/zustand/todolist',
    category: 'State Management',
    tech: 'Zustand',
  },
  {
    title: 'Recoil Counter',
    description: 'Recoil을 활용한 상태 관리 카운터',
    path: '/Recoil/counter',
    category: 'State Management',
    tech: 'Recoil',
  },
  {
    title: 'Hoisting Example',
    description: 'JavaScript 호이스팅 개념 실습',
    path: '/javascript/hoisting',
    category: 'JavaScript Concepts',
    tech: 'JavaScript',
  },
  {
    title: 'useMemo Hook',
    description: 'React useMemo 훅 최적화 예제',
    path: '/ReactHooks/useMemo',
    category: 'React Hooks',
    tech: 'React',
  },
  {
    title: 'useCallback Hook',
    description: 'React useCallback 훅 최적화 예제',
    path: '/ReactHooks/useCallback',
    category: 'React Hooks',
    tech: 'React',
  },
];

const categories = [...new Set(examples.map((example) => example.category))];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl blur-3xl -z-10"></div>
          <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <h1 className="text-5xl font-['NanumSquareNeoBold'] md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6 text-balance">
              Frontend Concepts Lab
            </h1>
            <p className="text-xl font-['NanumSquareNeo'] md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 text-pretty leading-relaxed">
              상태 관리, JavaScript 개념, React Hooks 등 다양한 주제의 실습
              예제들입니다. 각 카드를 클릭하여 실제 동작하는 예제를
              확인해보세요.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge
                variant="secondary"
                className="text-base font-['NanumSquareNeo'] px-4 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
              >
                State Management
              </Badge>
              <Badge
                variant="secondary"
                className="text-base font-['NanumSquareNeo'] px-4 py-2 bg-third/10 text-third border-third/20 hover:bg-third/20 transition-colors"
              >
                JavaScript Concepts
              </Badge>
              <Badge
                variant="secondary"
                className="text-base font-['NanumSquareNeo'] px-4 py-2 bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 transition-colors"
              >
                React Hooks
              </Badge>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-['NanumSquareNeo'] text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              총 {examples.length}개의 실습 예제
            </div>
          </div>
        </div>

        {/* Examples Sections */}
        {categories.map((category, categoryIndex) => (
          <div key={category} className="mb-16">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div
                  className={`w-3 h-8 rounded-full ${
                    categoryIndex === 0
                      ? 'bg-gradient-to-b from-primary to-primary/60'
                      : categoryIndex === 1
                      ? 'bg-gradient-to-b from-third to-third/60'
                      : 'bg-gradient-to-b from-secondary to-secondary/60'
                  }`}
                ></div>
                <h2 className="text-3xl font-['NanumSquareNeoBold'] font-bold text-foreground">
                  {category}
                </h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-border via-border/50 to-transparent"></div>
              <Badge
                variant="outline"
                className="text-sm font-['NanumSquareNeo'] px-3 py-1 bg-card border-border/50"
              >
                {
                  examples.filter((example) => example.category === category)
                    .length
                }
                개 예제
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {examples
                .filter((example) => example.category === category)
                .map((example, index) => (
                  <Link key={example.path} href={example.path}>
                    <Card className="h-full hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer group hover:scale-[1.03] hover:-translate-y-1 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-3">
                          <CardTitle className="group-hover:text-primary transition-colors text-xl font-['NanumSquareNeoBold'] font-semibold leading-tight">
                            {example.title}
                          </CardTitle>
                          <Badge
                            variant="secondary"
                            className={`text-xs font-['NanumSquareNeo'] px-2 py-1 shrink-0 ${
                              example.tech === 'Zustand'
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : example.tech === 'Recoil'
                                ? 'bg-accent/10 text-accent border-accent/20'
                                : example.tech === 'JavaScript'
                                ? 'bg-yellow-100/10 text-yellow-600 border-yellow-200/20 dark:bg-yellow-900/10 dark:text-yellow-400'
                                : 'bg-secondary/10 text-secondary border-secondary/20'
                            }`}
                          >
                            {example.tech}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm font-['NanumSquareNeo'] leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
                          {example.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-['NanumSquareNeo'] font-medium text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                            예제 보러가기
                            <span className="group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        ))}

        <div className="mt-20 pt-12 border-t border-gradient-to-r from-transparent via-border to-transparent text-center">
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border/30">
            <p className="text-muted-foreground text-base font-['NanumSquareNeo'] leading-relaxed max-w-2xl mx-auto">
              각 예제는 실제 동작하는 코드와 함께 제공됩니다. 소스 코드를
              확인하고 직접 수정해보며 학습해보세요.
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-third rounded-full animate-bounce"
                style={{ animationDelay: '0.1s' }}
              ></div>
              <div
                className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
