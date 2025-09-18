import { Target, TrendingUp, Users, DollarSign } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Metrics } from '@/lib/types';

export function FundraiserMetrics({ metrics }: { metrics: Metrics }) {
  const { goal, raised, slots } = metrics;
  const amountLeft = goal > raised ? goal - raised : 0;
  const percentageRaised = goal > 0 ? (raised / goal) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="text-center">
        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground ml-2" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(raised)}</div>
          <p className="text-xs text-muted-foreground">
            {percentageRaised.toFixed(1)}% of goal
          </p>
          <Progress value={percentageRaised} className="mt-2 h-2" />
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fundraising Goal</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground ml-2" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(goal)}</div>
          <p className="text-xs text-muted-foreground">Our target for this round</p>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Amount Left</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground ml-2" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(amountLeft)}</div>
          <p className="text-xs text-muted-foreground">to reach our goal</p>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Slots</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground ml-2" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{slots}</div>
          <p className="text-xs text-muted-foreground">for new brands to join</p>
        </CardContent>
      </Card>
    </div>
  );
}
