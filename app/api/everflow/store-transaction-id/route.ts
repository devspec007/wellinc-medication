import { NextResponse } from 'next/server';

// Simple backend storage for reference
// In production, you would store this in a database
const transactionIdStore = new Map<string, { transaction_id: string; timestamp: number }>();

export async function POST(req: Request) {
  try {
    const { transaction_id } = await req.json();
    
    if (!transaction_id) {
      return NextResponse.json({ error: 'transaction_id is required' }, { status: 400 });
    }
    
    console.log(`[Everflow] Received transaction_id: ${transaction_id}`);
    
    // Store for reference (you could store in DB and associate with user later)
    const timestamp = Date.now();
    transactionIdStore.set(transaction_id, {
      transaction_id,
      timestamp
    });
    
    // Clean up old entries (older than 24 hours)
    const oneDayAgo = timestamp - 24 * 60 * 60 * 1000;
    for (const [key, value] of transactionIdStore.entries()) {
      if (value.timestamp < oneDayAgo) {
        transactionIdStore.delete(key);
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error storing transaction_id:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

