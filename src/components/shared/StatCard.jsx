import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export const StatCard = ({ title, value, icon, trend, className }) => {
  return (
    <Card className={cn("stat-card card-hover", className)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-semibold mt-1">{value}</h3>
            
            {trend && (
              <div className="flex items-center gap-1 mt-1">
                <span className={cn(
                  "text-xs font-medium",
                  trend.positive ? "text-green-600" : "text-red-600"
                )}>
                  {trend.positive ? "+" : ""}{trend.value}%
                </span>
                <span className="text-xs text-muted-foreground">vs. last month</span>
              </div>
            )}
          </div>
          
          <div className="bg-ca-light p-2.5 rounded-lg">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};