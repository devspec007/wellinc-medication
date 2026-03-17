import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api';

const BASE_URL = API_CONFIG.BASE_URL;
const SECRET_API_KEY = process.env.SECRET_API_KEY!;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, correlationId, fileKey } = body;

    if (!token) {
      return NextResponse.json({ error: 'Authorization token is required.' }, { status: 401 });
    }
    if (!correlationId) {
      return NextResponse.json({ error: 'Correlation ID is required.' }, { status: 400 });
    }
    if (!fileKey || typeof fileKey !== 'string') {
      return NextResponse.json({ error: 'fileKey is required.' }, { status: 400 });
    }

    const res = await fetch(`${BASE_URL}${API_CONFIG.FILES_CONFIRM_UPLOAD}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-api-key': SECRET_API_KEY,
        'x-client-correlation-id': correlationId,
      },
      body: JSON.stringify({ fileKey }),
    });

    let data: {
      confirmed?: boolean;
      fileKey?: string;
      message?: string;
      error?: string | { message?: string };
    } = {};
    try {
      data = await res.json();
    } catch {
      // Non-JSON or empty body
    }

    if (!res.ok) {
      const err = data?.error;
      const message =
        typeof err === 'string'
          ? err
          : (typeof err === 'object' && err != null && typeof (err as { message?: string }).message === 'string'
              ? (err as { message: string }).message
              : data?.message ?? 'Failed to confirm upload.');
      return NextResponse.json({ error: message }, { status: res.status });
    }

    return NextResponse.json({
      confirmed: data.confirmed,
      fileKey: data.fileKey,
      message: data.message,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error.' }, { status: 500 });
  }
}
