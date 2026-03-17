import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api';

const BASE_URL = API_CONFIG.BASE_URL;
const SECRET_API_KEY = process.env.SECRET_API_KEY!;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, correlationId, uploadType, fileName, fileType, documentType } = body;

    if (!token) {
      return NextResponse.json({ error: 'Authorization token is required.' }, { status: 401 });
    }
    if (!correlationId) {
      return NextResponse.json({ error: 'Correlation ID is required.' }, { status: 400 });
    }
    if (!uploadType || !fileName || !fileType || !documentType) {
      return NextResponse.json(
        { error: 'uploadType, fileName, fileType, and documentType are required.' },
        { status: 400 }
      );
    }

    const res = await fetch(`${BASE_URL}${API_CONFIG.FILES_UPLOAD_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-api-key': SECRET_API_KEY,
        'x-client-correlation-id': correlationId,
      },
      body: JSON.stringify({
        uploadType,
        fileName,
        fileType,
        documentType,
      }),
    });

    let data: {
      uploadUrl?: string;
      fields?: Record<string, string>;
      fileKey?: string;
      expiresIn?: number;
      error?: string | { code?: string; message?: string };
      message?: string;
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
              : data?.message ?? 'Failed to get upload URL.');
      return NextResponse.json({ error: message }, { status: res.status });
    }

    return NextResponse.json({
      uploadUrl: data.uploadUrl,
      fields: data.fields ?? {},
      fileKey: data.fileKey,
      expiresIn: data.expiresIn,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error.' }, { status: 500 });
  }
}
