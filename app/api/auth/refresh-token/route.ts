import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api';

const BASE_URL = API_CONFIG.BASE_URL;
const SECRET_API_KEY = process.env.SECRET_API_KEY!;

export async function POST(req: Request) {
  try {
    // Get token and correlationId from request body
    const { token, correlationId } = await req.json();
    
    if (!token) {
      return NextResponse.json({ error: 'Authorization token is required.' }, { status: 401 });
    }
    
    if (!correlationId) {
      return NextResponse.json({ error: 'Correlation ID is required.' }, { status: 400 });
    }
    
    const res = await fetch(`${BASE_URL}${API_CONFIG.REFRESH_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-api-key': SECRET_API_KEY,
        'x-client-correlation-id': correlationId,
      },
    });
    
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ status: res.status });
    }
    return NextResponse.json({ newToken: data?.data?.newToken }, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error.' }, { status: 500 });
  }
}