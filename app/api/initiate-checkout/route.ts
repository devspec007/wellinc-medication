import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api';

const BASE_URL = API_CONFIG.BASE_URL;
const SECRET_API_KEY = process.env.SECRET_API_KEY!;

export async function POST(req: Request) {
  try {
    // Get body parameters
    const { token, correlationId, productGroupId, membershipPlanId, membershipPlanVariantId } = await req.json();
    
    if (!token) {
      return NextResponse.json({ error: 'token is required.' }, { status: 400 });
    }
    
    if (!correlationId) {
      return NextResponse.json({ error: 'correlationId is required.' }, { status: 400 });
    }
    
    if (!productGroupId) {
      return NextResponse.json({ error: 'productGroupId is required.' }, { status: 400 });
    }
    
    if (!membershipPlanId) {
      return NextResponse.json({ error: 'membershipPlanId is required.' }, { status: 400 });
    }
    
    if (!membershipPlanVariantId) {
      return NextResponse.json({ error: 'membershipPlanVariantId is required.' }, { status: 400 });
    }
    
    const res = await fetch(`${BASE_URL}${API_CONFIG.INITIATE_CHECKOUT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-api-key': SECRET_API_KEY,
        'x-client-correlation-id': correlationId,
      },
      body: JSON.stringify({
        productGroupId,
        membershipPlanId,
        membershipPlanVariantId,
      }),
    });
    
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.error || data.message || 'Failed to initiate checkout.' }, { status: res.status });
    }
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error.' }, { status: 500 });
  }
}

