'use client'

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Calendar, TrendingUp, Users, Eye } from "lucide-react";

interface VisitData {
  date: string;
  visits: number;
  uniqueVisitors: number;
  pageViews: number;
}

// 模拟数据 - 在实际项目中，这些数据应该从API获取
const generateMockData = (days: number = 30): VisitData[] => {
  const data: VisitData[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // 生成随机但合理的访问数据
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

interface VisitStatsProps {
  period?: '7d' | '30d' | '90d';
}

const VisitStats: React.FC<VisitStatsProps> = ({ period = '30d' }) => {
  const [data, setData] = useState<VisitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'visits' | 'uniqueVisitors' | 'pageViews'>('visits');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000));

        const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
        const mockData = generateMockData(days);
        setData(mockData);
      } catch (error) {
        console.error('Failed to fetch visit stats:', error);
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
  const totalValue = data.reduce((sum, item) => sum + (item as any)[selectedMetric], 0);
  const avgValue = Math.round(totalValue / data.length);

  if (loading) {
    return (
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">访问量统计</h3>
          <p className="text-sm text-muted-foreground">网站访问数据分析</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {period === '7d' ? '最近7天' : period === '30d' ? '最近30天' : '最近90天'}
          </span>
        </div>
      </div>

      {/* Metric Selector */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'visits', label: '访问量', icon: <Eye size={16} /> },
          { key: 'uniqueVisitors', label: '独立访客', icon: <Users size={16} /> },
          { key: 'pageViews', label: '页面浏览量', icon: <TrendingUp size={16} /> }
        ].map((metric) => (
          <button
            key={metric.key}
            onClick={() => setSelectedMetric(metric.key as any)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${selectedMetric === metric.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
          >
            {metric.icon}
            {metric.label}
          </button>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            {currentMetric.icon}
            <span className="text-sm font-medium">{currentMetric.label}</span>
          </div>
          <p className="text-2xl font-bold">{totalValue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">总计</p>
        </div>
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">日均</span>
          </div>
          <p className="text-2xl font-bold">{avgValue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">平均值</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
              labelFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });
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

      {/* Period Selector */}
      <div className="flex justify-center gap-2 mt-6">
        {[
          { key: '7d', label: '7天' },
          { key: '30d', label: '30天' },
          { key: '90d', label: '90天' }
        ].map((p) => (
          <button
            key={p.key}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${period === p.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VisitStats; 