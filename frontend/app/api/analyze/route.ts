import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    // Call the Python backend
    const response = await fetch('http://localhost:8000/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: prompt,
        chat_history: []
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze campaign');
    }

    const data = await response.json();
    return NextResponse.json({ result: data.answer });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to analyze campaign' }, { status: 500 });
  }
}
