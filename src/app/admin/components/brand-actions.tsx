'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { approveBrandAction, generateDescriptionAction, rejectBrandAction } from '../actions';
import type { Brand } from '@/lib/types';
import { Loader2, Sparkles, ShieldAlert } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';

type ActionType = 'approve' | 'reject';

export function BrandActions({ brand }: { brand: Brand }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [code, setCode] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAction = () => {
    if (!actionType) return;

    startTransition(async () => {
      const result =
        actionType === 'approve'
          ? await approveBrandAction(brand.id, code)
          : await rejectBrandAction(brand.id, code);

      if (result.success) {
        toast({ title: 'Success', description: result.message });
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.message });
      }
      setIsDialogOpen(false);
      setCode('');
    });
  };
  
  const handleGenerateDescription = () => {
    startTransition(async () => {
      const result = await generateDescriptionAction(brand);
      if (result.success) {
        toast({ title: 'Description Generated!', description: 'The new AI-powered description has been saved.' });
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.message });
      }
    });
  };

  const onDialogTrigger = (type: ActionType) => {
    setActionType(type);
    setIsDialogOpen(true);
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {brand.status === 'pending' && (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <div>
              <Button onClick={() => onDialogTrigger('approve')} disabled={isPending} size="sm" variant="secondary">
                Approve
              </Button>
              <Button onClick={() => onDialogTrigger('reject')} disabled={isPending} size="sm" variant="destructive" className="ml-2">
                Reject
              </Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <ShieldAlert className="text-amber-500"/>
                Admin Confirmation Required
              </AlertDialogTitle>
              <AlertDialogDescription>
                To {actionType} the brand "{brand.brandName}", please enter the 4-digit admin code.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Input 
              type="password"
              maxLength={4}
              placeholder="****"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="text-center font-mono tracking-[0.5em]"
            />
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setCode('')}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAction} disabled={isPending || code.length !== 4}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm & {actionType === 'approve' ? 'Approve' : 'Reject'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {brand.status === 'approved' && (
        <>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" disabled={isPending} className="bg-accent/20 hover:bg-accent/40">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!isPending && <Sparkles className="mr-2 h-4 w-4" />}
                {brand.generatedDescription ? 'Regenerate' : 'Generate'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Generate AI Description?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will use AI to create a new marketing description for "{brand.brandName}". 
                  {brand.generatedDescription && ' It will replace the current AI-generated description.'}
                  This action will save the new description automatically.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleGenerateDescription} disabled={isPending}>
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Confirm & Generate
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}
