import { NextResponse } from 'next/server';
import { z } from 'zod';
import { addBrand } from '@/lib/data';

const brandSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  contact: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = brandSchema.parse(json);

    const newBrand = await addBrand(body);

    return NextResponse.json(newBrand, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
