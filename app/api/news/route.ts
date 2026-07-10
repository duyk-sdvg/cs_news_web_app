import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let query = searchParams.get('q') || '+CS2+tournament';
  const language = searchParams.get('language') || 'en';
  const sortBy = searchParams.get('sortBy') || 'popularity';
  const pageSize = searchParams.get('pageSize') || '5';
  const page = searchParams.get('page') || '1';

  // Если в запросе есть спецсимволы (дефис, пробел) и нет кавычек — обернём
  // if (/[-\s]/.test(query) && !query.startsWith('"')) {
  //   query = `"${query}"`;
  // }

  const apiKey = process.env.NEWSAPI_KEY;
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=${language}&sortBy=${sortBy}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
  // console.log('Fetching:', url.replace(apiKey!, '***'));

  try {
    const res = await fetch(url);
    // console.log('Status:', res.status);
    const data = await res.json();
    // console.log('Response:', data);
    return NextResponse.json(data);
  } catch (err) {
    // console.error('❌ Fetch error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch', details: String(err) },
      { status: 500 }
    );
  }
}