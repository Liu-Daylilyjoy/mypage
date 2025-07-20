'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Badge } from "@/components/ui/shadcn/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, Users, Eye, FileText, Lightbulb, Camera, Activity, Target, Zap } from "lucide-react";

interface VisitData {
  date: string;
  visits: number;
  uniqueVisitors: number;
  pageViews: number;
}

interface PageData {
  name: string;
  visits: number;
  color: string;
}

// 模拟数据生成
const generateMockData = (days: number = 30): VisitData[] => {
  const data: VisitData[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const baseVisits = Math.floor(Math.random() * 50) + 20;
    const uniqueVisitors = Math.floor(baseVisits * (0.6 + Math.random() * 0.3));
    const pageViews = Math.floor(baseVisits * (1.5 + Math.random() * 1.5));

    data.push({
      date: date.toISOString().split('T')[0],
      visits: baseVisits,
      uniqueVisitors,
      pageViews
    });
  }

  return data;
};

const generatePageData = (): PageData[] => [
  { name: '首页', visits: 1250, color: '#3b82f6' },
  { name: '博客', visits: 890, color: '#10b981' },
  { name: '思考', visits: 650, color: '#f59e0b' },
  { name: '摄影', visits: 420, color: '#ef4444' },
  { name: '关于', visits: 180, color: '#8b5cf6' }
];

interface DashboardStatsProps {
  period?: '7d' | '30d' | '90d';
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ period = '30d' }) => {
  const [visitData, setVisitData] = useState<VisitData[]>([]);
  const [pageData, setPageData] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'visits' | 'uniqueVisitors' | 'pageViews'>('visits');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
        const mockVisitData = generateMockData(days);
        const mockPageData = generatePageData();

        setVisitData(mockVisitData);
        setPageData(mockPageData);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  const getMetricInfo = (metric: string) => {
    switch (metric) {
      case 'visits':
        return { label: '访问量', color: '#3b82f6', icon: <Eye size={16} /> };
      case 'uniqueVisitors':
        return { label: '独立访客', color: '#10b981', icon: <Users size={16} /> };
      case 'pageViews':
        return { label: '页面浏览量', color: '#f59e0b', icon: <TrendingUp size={16} /> };
      default:
        return { label: '访问量', color: '#3b82f6', icon: <Eye size={16} /> };
    }
  };

  const currentMetric = getMetricInfo(selectedMetric);
  const totalValue = visitData.reduce((sum, item) => sum + (item as any)[selectedMetric], 0);
  const avgValue = Math.round(totalValue / visitData.length);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">加载中...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse">
                <div className="h-8 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总访问量</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 20) + 10}% 较上月
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">独立访客</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {visitData.reduce((sum, item) => sum + item.uniqueVisitors, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 15) + 8}% 较上月
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">页面浏览量</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {visitData.reduce((sum, item) => sum + item.pageViews, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 25) + 15}% 较上月
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均停留时间</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(Math.random() * 5) + 2}分{Math.floor(Math.random() * 60)}秒</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 30) + 10}% 较上月
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visit Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>访问趋势</CardTitle>
            <CardDescription>网站访问量变化趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              {[
                { key: 'visits', label: '访问量', icon: <Eye size={16} /> },
                { key: 'uniqueVisitors', label: '独立访客', icon: <Users size={16} /> },
                { key: 'pageViews', label: '页面浏览量', icon: <TrendingUp size={16} /> }
              ].map((metric) => (
                <Badge
                  key={metric.key}
                  variant={selectedMetric === metric.key ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setSelectedMetric(metric.key as any)}
                >
                  {metric.icon}
                  {metric.label}
                </Badge>
              ))}
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke={currentMetric.color}
                    fill={currentMetric.color}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Page Popularity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>页面热度</CardTitle>
            <CardDescription>各页面访问量分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pageData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Bar dataKey="visits" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Period Selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center gap-2">
            {[
              { key: '7d', label: '最近7天' },
              { key: '30d', label: '最近30天' },
              { key: '90d', label: '最近90天' }
            ].map((p) => (
              <Badge
                key={p.key}
                variant={period === p.key ? "default" : "secondary"}
                className="cursor-pointer"
              >
                {p.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats; 