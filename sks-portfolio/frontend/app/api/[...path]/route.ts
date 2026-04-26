import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
const INTERNAL_SECRET_TOKEN = process.env.INTERNAL_SECRET_TOKEN || 'this_is_a_shared_secret_for_proxy';

async function handleProxy(req: NextRequest) {
  const path = req.nextUrl.pathname.replace(/^\/api/, '/api');
  const targetUrl = `${BACKEND_URL}${path}${req.nextUrl.search}`;

  const headers = new Headers(req.headers);
  headers.set('x-internal-token', INTERNAL_SECRET_TOKEN);

  const authHeader = req.headers.get('authorization');
  if (authHeader) headers.set('authorization', authHeader);

  const cookies = req.headers.get('cookie');
  if (cookies) {
    headers.set('cookie', cookies);
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? await req.text() : undefined,
    });

    const data = await response.text();

    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete('content-encoding');

    return new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
