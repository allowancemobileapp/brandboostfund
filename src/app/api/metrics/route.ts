import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getMetrics, updateMetrics } from '@/lib/data';

const metricsSchema = z.object({
  goal: z.number().int().positive().optional(),
  raised: z.number().int().nonnegative().optional(),
  slots: z.number().int().nonnegative().optional(),
});

export async function GET() {
  try {
    const metrics = await getMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const adminCode = request.headers.get('x-admin-code');
  // In a real app, you might use a more secure API key mechanism
  if (adminCode !== '4190') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const json = await request.json();
    const body = metricsSchema.parse(json);

    if (Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Request body cannot be empty.' }, { status: 400 });
    }

    const updatedMetrics = await updateMetrics(body);

    return NextResponse.json(updatedMetrics);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
     const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
