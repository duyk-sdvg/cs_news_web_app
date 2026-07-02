import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let query = searchParams.get('q') || 'Counter-Strike';
  const lang = searchParams.get('lang') || 'ru';

  // Если в запросе есть спецсимволы (дефис, пробел) и нет кавычек — обернём
  if (/[-\s]/.test(query) && !query.startsWith('"')) {
    query = `"${query}"`;
  }

  const apiKey = process.env.GNEWS_API_KEY;
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=${lang}&apikey=${apiKey}`;
//   console.log('Fetching:', url.replace(apiKey, '***'));

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