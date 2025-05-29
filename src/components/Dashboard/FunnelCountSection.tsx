import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  time: string;
  color: string; // Tailwind color class e.g., 'bg-red-500'
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, time: '2 days', color: 'bg-red-500' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, time: '2 days', color: 'bg-yellow-500' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, time: 'average time on this stage', color: 'bg-indigo-600' }, // Dark blue/purple
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, time: '8 days', color: 'bg-green-500' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, time: '10 days', color: 'bg-purple-600' },
];

const totalActiveLeads = funnelData.reduce((sum, stage) => sum + stage.count, 0);
const maxCount = Math.max(...funnelData.map(s => s.count));

const FunnelCountSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Funnel count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-5xl font-bold text-foreground">{totalActiveLeads}</span>
          <span className="ml-2 text-sm text-muted-foreground">active leads</span>
        </div>

        {/* Funnel Bar Visualization */}
        <TooltipProvider>
          <div className="flex w-full h-3 rounded-full overflow-hidden mb-6">
            {funnelData.map((stage) => (
              <Tooltip key={stage.id} delayDuration={100}>
                <TooltipTrigger asChild>
                  <div 
                    className={cn('h-full', stage.color)}
                    style={{ width: `${(stage.count / totalActiveLeads) * 100}%` }}
                  ></div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stage.name}: {stage.count} leads</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        {/* Stage List */}
        <ul className="space-y-3">
          {funnelData.map((stage) => (
            <li key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-sm">
              <div className={cn('w-3 h-3 rounded-sm', stage.color)}></div>
              <span className="text-foreground text-left truncate">{stage.name}</span>
              <span className="text-muted-foreground text-right">{stage.count}</span>
              <span className="text-muted-foreground text-right">$ {stage.value}</span>
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <span className={cn("text-muted-foreground text-right", stage.id === 'inConversation' ? 'bg-gray-800 text-white px-2 py-1 rounded text-xs' : '')}>
                      {stage.time}
                    </span>
                  </TooltipTrigger>
                  {stage.id === 'inConversation' && (
                    <TooltipContent side="top" className="bg-gray-800 text-white">
                       <p>Average time on this stage</p>
                    </TooltipContent>
                  )}
                  {stage.id !== 'inConversation' && (
                     <TooltipContent side="top">
                       <p>Time in stage: {stage.time}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FunnelCountSection;
