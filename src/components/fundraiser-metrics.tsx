import { Target, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { Metrics } from '@/lib/types';

export function FundraiserMetrics({ metrics }: { metrics: Metrics }) {
  const { goal, raised, slots } = metrics;
  const amountLeft = goal > raised ? goal - raised : 0;
  const percentageRaised = goal > 0 ? (raised / goal) * 100 : 0;

  const formatCurrency = (amount: number) => {
    // Format as NGN without currency symbol
    return new Intl.NumberFormat('en-NG', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const formatNGN = (amount: number) => {
    return `N${formatCurrency(amount)}`;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      <div className="text-center flex flex-col items-center">
        <div className="flex flex-row items-center justify-center space-y-0 pb-2">
            <h3 className="text-sm font-medium uppercase text-muted-foreground">Total Raised</h3>
        </div>
        <div>
          <div className="text-5xl font-bold font-headline">{formatNGN(raised)}</div>
          <p className="text-xs text-muted-foreground">
            {percentageRaised.toFixed(1)}% of goal
          </p>
          <Progress value={percentageRaised} className="mt-2 h-2" />
        </div>
      </div>
      <div className="text-center flex flex-col items-center">
        <div className="flex flex-row items-center justify-center space-y-0 pb-2">
            <h3 className="text-sm font-medium uppercase text-muted-foreground">Fundraising Goal</h3>
        </div>
        <div>
          <div className="text-5xl font-bold font-headline">{formatNGN(goal)}</div>
          <p className="text-xs text-muted-foreground">Our target for this round</p>
        </div>
      </div>
      <div className="text-center flex flex-col items-center">
        <div className="flex flex-row items-center justify-center space-y-0 pb-2">
            <h3 className="text-sm font-medium uppercase text-muted-foreground">Amount Left</h3>
        </div>
        <div>
          <div className="text-5xl font-bold font-headline">{formatNGN(amountLeft)}</div>
          <p className="text-xs text-muted-foreground">to reach our goal</p>
        </div>
      </div>
      <div className="text-center flex flex-col items-center">
        <div className="flex flex-row items-center justify-center space-y-0 pb-2">
            <h3 className="text-sm font-medium uppercase text-muted-foreground">Available Slots</h3>
        </div>
        <div>
          <div className="text-5xl font-bold font-headline">{slots}</div>
          <p className="text-xs text-muted-foreground">for new brands to join</p>
        </div>
      </div>
    </div>
  );
}
