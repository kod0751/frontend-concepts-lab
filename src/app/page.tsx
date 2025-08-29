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
];

const categories = [...new Set(examples.map((example) => example.category))];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            React 예제 모음
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            다양한 React 개념과 상태 관리 라이브러리를 실습해볼 수 있는
            예제들입니다. 각 카드를 클릭하여 예제를 확인해보세요.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6 border-b pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examples
                .filter((example) => example.category === category)
                .map((example) => (
                  <Link key={example.path} href={example.path}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {example.title}
                          </CardTitle>
                          <Badge variant="secondary">{example.tech}</Badge>
                        </div>
                        <CardDescription className="text-sm">
                          {example.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>예제 보러가기 →</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
