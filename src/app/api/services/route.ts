import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Service } from '@/models/Service';
import { mockServices } from '@/data/mockDB';

export async function GET() {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      return NextResponse.json(mockServices);
    }

    await dbConnect();
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Fetch Services Error, falling back to mock:', error);
    return NextResponse.json(mockServices);
  }
}
