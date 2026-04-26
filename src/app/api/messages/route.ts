import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Message } from '@/models/Message';
import { mockMessages } from '@/data/mockDB';

export async function GET() {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      return NextResponse.json(mockMessages);
    }

    await dbConnect();
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Fetch Messages Error:', error);
    return NextResponse.json(mockMessages);
  }
}
