import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Tooltip as ShadTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SourceDataPoint {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

const leadsCameData: SourceDataPoint[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: '#EB5757' }, // red
  { name: 'Behance', value: 1000, percentage: 40, color: '#F2C94C' }, // yellow
  { name: 'Instagram', value: 1000, percentage: 10, color: '#2F80ED' }, // blue
  { name: 'Dribbble', value: 1000, percentage: 10, color: '#27AE60' }, // green
];

const leadsConvertedData: SourceDataPoint[] = [
  { name: 'Organic Search', value: 2500, percentage: 45, color: '#BB6BD9' }, // purple
  { name: 'Referral', value: 1500, percentage: 30, color: '#2196F3' }, // light blue
  { name: 'Direct', value: 800, percentage: 15, color: '#FF9800' }, // orange
  { name: 'Social Media', value: 700, percentage: 10, color: '#4CAF50' }, // green
];

const totalDealsSizeData: SourceDataPoint[] = [
  { name: 'Enterprise', value: 50000, percentage: 60, color: '#FF5722' }, // deep orange
  { name: 'SMB', value: 25000, percentage: 30, color: '#00BCD4' }, // cyan
  { name: 'Startup', value: 10000, percentage: 10, color: '#8BC34A' }, // light green
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 border border-border rounded shadow-lg">
        <p className="text-sm text-foreground">{`${payload[0].name} : ${payload[0].value.toLocaleString()}`}</p>
        <p className="text-xs text-muted-foreground">{`${payload[0].payload.percentage}%`}</p>
      </div>
    );
  }
  return null;
};

const SourcesBreakdown: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'leadsCame' | 'leadsConverted' | 'totalDeals'>('leadsCame');

  const getCurrentData = () => {
    switch (activeTab) {
      case 'leadsCame': return leadsCameData;
      case 'leadsConverted': return leadsConvertedData;
      case 'totalDeals': return totalDealsSizeData;
      default: return leadsCameData;
    }
  };

  const currentData = getCurrentData();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Sources</CardTitle>
        <TooltipProvider>
            <ShadTooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        from leads total
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Percentage from total leads</p>
                </TooltipContent>
            </ShadTooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="leadsCame">Leads came</TabsTrigger>
            <TabsTrigger value="leadsConverted">Leads Converted</TabsTrigger>
            <TabsTrigger value="totalDeals">Total deals size</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {currentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="space-y-2 text-sm">
                {currentData.map((source) => (
                  <li key={source.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span style={{ backgroundColor: source.color }} className="w-3 h-3 rounded-sm mr-2"></span>
                      <span className="text-foreground">{source.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="text-muted-foreground w-16 text-right">$ {source.value.toLocaleString()}</span>
                        <span className="text-muted-foreground w-8 text-right">{source.percentage}%</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SourcesBreakdown;
