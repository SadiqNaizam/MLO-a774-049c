import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface Metric {
  id: string;
  value: string | number;
  label: string;
  hasTooltip?: boolean;
  tooltipText?: string;
}

const otherDataMetrics: Metric[] = [
  { id: 'totalLeads', value: 900, label: 'total leads count' },
  { id: 'avgConversionTime', value: 12, label: 'days in average to convert lead' },
  {
    id: 'inactiveLeads',
    value: 30,
    label: 'inactive leads',
    hasTooltip: true,
    tooltipText: 'Leads with no activity in the last 30 days.',
  },
];

const OtherDataSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Other data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {otherDataMetrics.map((metric) => (
            <div key={metric.id} className="flex flex-col">
              <span className="text-4xl font-bold text-foreground">{metric.value}</span>
              <div className="flex items-center mt-1">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                {metric.hasTooltip && (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{metric.tooltipText}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OtherDataSection;
