import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronDown } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: LeadsTrackingDataPoint[] = [
  { month: 'Jan', closedWon: 65, closedLost: 40 },
  { month: 'Feb', closedWon: 59, closedLost: 30 },
  { month: 'Mar', closedWon: 80, closedLost: 20 },
  { month: 'Apr', closedWon: 81, closedLost: 27 },
  { month: 'May', closedWon: 56, closedLost: 70 },
  { month: 'Jun', closedWon: 55, closedLost: 90 },
  { month: 'Jul', closedWon: 40, closedLost: 65 },
  { month: 'Aug', closedWon: 72, closedLost: 32 },
  { month: 'Sep', closedWon: 60, closedLost: 55 },
  { month: 'Oct', closedWon: 90, closedLost: 25 }, 
  { month: 'Nov', closedWon: 75, closedLost: 45 },
  { month: 'Dec', closedWon: 65, closedLost: 35 },   
];

const totalClosedWon = leadsTrackingData.reduce((sum, item) => sum + item.closedWon, 0);
const totalClosedLost = leadsTrackingData.reduce((sum, item) => sum + item.closedLost, 0);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 border border-border rounded shadow-lg text-sm">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((pld: any) => (
          <div key={pld.dataKey} style={{ color: pld.stroke }} className="flex justify-between">
            <span>{pld.name}:</span>
            <span className="font-medium ml-2">{pld.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const LeadsTracking: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState<string>('Last 6 months');
  const timeRanges = ['Last 3 months', 'Last 6 months', 'Last 12 months', 'All Time'] as const;

  const filteredData = React.useMemo(() => {
    let numMonths = leadsTrackingData.length;
    if (selectedTimeRange === 'Last 3 months') numMonths = 3;
    else if (selectedTimeRange === 'Last 6 months') numMonths = 6;
    else if (selectedTimeRange === 'Last 12 months') numMonths = 12;
    return leadsTrackingData.slice(-numMonths);
  }, [selectedTimeRange]);

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">Leads tracking</CardTitle>
          <div className="mt-1">
            <span className="text-3xl font-bold text-foreground">{totalClosedWon}</span>
            <span className="ml-1 mr-4 text-sm text-muted-foreground">total closed</span>
            <span className="text-3xl font-bold text-foreground">{totalClosedLost}</span>
            <span className="ml-1 text-sm text-muted-foreground">total lost</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center text-muted-foreground text-xs">
              <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
              {selectedTimeRange}
              <ChevronDown className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {timeRanges.map((range) => (
              <DropdownMenuItem key={range} onClick={() => setSelectedTimeRange(range)}>
                {range}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#065f46" stopOpacity={0.4}/> {/* Darker green, using Tailwind emerald-800 as base */} 
                  <stop offset="95%" stopColor="#065f46" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.4}/> {/* Tailwind red-600 */}
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                dy={10}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                dx={-5}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '3 3' }} />
              <Legend 
                verticalAlign="bottom" 
                align="left" 
                iconType="square" 
                iconSize={10}
                wrapperStyle={{ paddingTop: '20px', paddingLeft: '10px' }}
                formatter={(value, entry) => <span className="text-muted-foreground text-xs ml-1">{value}</span>}
              />
              <Area 
                type="monotone" 
                dataKey="closedWon" 
                name="Closed won"
                stroke="#059669" // Tailwind emerald-600
                fillOpacity={1} 
                fill="url(#colorClosedWon)"
                strokeWidth={2} 
                dot={{ r: 4, fill: '#059669', strokeWidth:0 }}
                activeDot={{ r: 6, fill: '#059669', strokeWidth: 0 }}
              />
              <Area 
                type="monotone" 
                dataKey="closedLost" 
                name="Closed lost"
                stroke="#EF4444" // Tailwind red-500
                fillOpacity={1} 
                fill="url(#colorClosedLost)" 
                strokeWidth={2} 
                dot={{ r: 4, fill: '#EF4444', strokeWidth:0 }}
                activeDot={{ r: 6, fill: '#EF4444', strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTracking;
