
'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { approveBrandAction, generateWebsitePromptAction, rejectBrandAction } from '../actions';
import type { Brand } from '@/lib/types';
import { Loader2, Sparkles, ShieldAlert, FileText } from 'lucide-react';
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
  
  const handleGeneratePrompt = () => {
    startTransition(async () => {
      const result = await generateWebsitePromptAction(brand);
      if (result.success && result.prompt) {
        toast({ title: 'Prompt Generated!', description: 'Your prompt is being downloaded.' });
        
        // Trigger download
        const blob = new Blob([result.prompt], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${brand.brand_name.toLowerCase().replace(/\s+/g, '-')}-website-prompt.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

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
                To {actionType} the brand "{brand.brand_name}", please enter the 4-digit admin code.
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
              <Button variant="outline" size="sm" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                {brand.website_prompt ? 'Regenerate Prompt' : 'Generate Website Prompt'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Generate Website Build Prompt?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will generate a detailed prompt for an AI code builder to create a website for "{brand.brand_name}".
                  The prompt will be saved and downloaded as a text file.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleGeneratePrompt} disabled={isPending}>
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
