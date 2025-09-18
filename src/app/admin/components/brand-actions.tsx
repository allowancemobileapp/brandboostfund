'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { approveBrandAction, generateDescriptionAction } from '../actions';
import type { Brand } from '@/lib/types';
import { Loader2, Sparkles } from 'lucide-react';
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

export function BrandActions({ brand }: { brand: Brand }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleApprove = () => {
    startTransition(async () => {
      const result = await approveBrandAction(brand.id);
      if (result.success) {
        toast({ title: 'Success', description: result.message });
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.message });
      }
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

  return (
    <div className="flex items-center justify-end gap-2">
      {brand.status === 'pending' && (
        <Button onClick={handleApprove} disabled={isPending} size="sm">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Approve
        </Button>
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
                  This will use AI to create a new marketing description for "{brand.name}". 
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
