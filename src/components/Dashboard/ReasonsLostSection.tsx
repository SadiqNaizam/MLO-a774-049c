import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReasonLost {
  id: string;
  percentage: number;
  reason: string;
  className?: string;
}

const reasonsLostData: ReasonLost[] = [
  { id: 'proposalUnclear1', percentage: 40, reason: 'The proposal is unclear', className: 'md:row-span-2' },
  { id: 'venturePursuit', percentage: 20, reason: 'However venture pursuit' },
  { id: 'other', percentage: 10, reason: 'Other' },
  { id: 'proposalUnclear2', percentage: 30, reason: 'The proposal is unclear' }, // Duplicate reason from image, handled
];

const ReasonsLostSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Reasons of leads lost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reasonsLostData.map((item) => (
            <div key={item.id} className={cn("flex flex-col", item.className)}>
              <span className="text-4xl font-bold text-foreground">{item.percentage}%</span>
              <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReasonsLostSection;
