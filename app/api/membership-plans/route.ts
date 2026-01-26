import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api';

const BASE_URL = API_CONFIG.BASE_URL;
const SECRET_API_KEY = process.env.SECRET_API_KEY!;

export async function GET(req: Request) {
  try {
    // Get token from headers (forwarded by client or from cookie/localStorage)
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'No token provided.' }, { status: 401 });
    }
    
    const correlationId = req.headers.get('x-client-correlation-id');
    if (!correlationId) {
      return NextResponse.json({ error: 'Correlation ID is required.' }, { status: 400 });
    }
    
    const res = await fetch(`${BASE_URL}/membership-plans`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-api-key': SECRET_API_KEY,
        'x-client-correlation-id': correlationId,
      }
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'Failed to fetch plans.' }, { status: res.status });
    }
    return NextResponse.json(data?.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error.' }, { status: 500 });
  }
}

