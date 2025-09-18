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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const apiKey = request.headers.get('x-api-key');
  if (!process.env.ADMIN_API_KEY || apiKey !== process.env.ADMIN_API_KEY) {
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
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
