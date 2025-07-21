'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { Eye } from "lucide-react";
import useStats from "@/hook/useStats";
import { useMemo } from "react";

const DashboardStats: React.FC = () => {
  const { data } = useStats();

  // 计算总访问量
  const totalVisits = useMemo(() => data?.visitStats?.reduce((sum, item) => sum + item.count, 0) || 0, [data]);
  const visitStats = data?.visitStats || [];

  return (
    <div className="space-y-6">
      <div className="bg-card pt-6 px-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">{totalVisits.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">Total Visits</span>
          </div>
        </div>
        <div className="h-80 w-full flex items-center justify-center">
          {totalVisits === 0 ? (
            <span className="text-muted-foreground text-lg">No visit data yet.</span>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={visitStats} outerRadius={120}>
                <PolarGrid />
                <PolarAngleAxis dataKey="page" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))',
                  }}
                  formatter={(value: any) => value?.toLocaleString?.()}
                  labelFormatter={(label: string) => `page: ${label}`}
                />
                <Radar name="Visits" dataKey="count" stroke="var(--theme-color)" fill="var(--theme-color)" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats; 