import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get('taskId');

  if (!taskId) {
    return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
  }

  try {
    const checkResponse = await fetch(
      `https://api.sunoapi.org/api/v1/generate/record-info?taskId=${taskId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.SUNOAPI_ORG || ''}`,
        },
      }
    );

    const checkData = await checkResponse.json();
    
    // Log the full response for debugging
    console.log('Status check response:', JSON.stringify(checkData, null, 2));

    if (checkData.code !== 200) {
      console.error('API returned error:', checkData);
      return NextResponse.json(
        { error: checkData.msg || 'Failed to check status' },
        { status: 500 }
      );
    }

    const status = checkData.data?.status;
    const tracks = checkData.data?.response?.sunoData;
    
    // Log full track data to debug lyrics field
    console.log('Parsed status:', status);
    console.log('Full track data:', JSON.stringify(tracks?.[0], null, 2));

    // Handle SENSITIVE_WORD_ERROR status
    if (status === 'SENSITIVE_WORD_ERROR') {
      return NextResponse.json({
        status: 'FAILED',
        error: 'Content contains sensitive words or inappropriate content. Please modify your prompt and try again.',
        sensitiveWordError: true
      });
    }

    // Lyrics can be in 'lyric' field or 'prompt' field (when it contains [Verse] markers)
    let lyrics = null;
    if (status === 'SUCCESS' && tracks?.[0]) {
      if (tracks[0].lyric) {
        lyrics = tracks[0].lyric;
      } else if (tracks[0].prompt && tracks[0].prompt.includes('[')) {
        // prompt field contains lyrics when it has verse/chorus markers
        lyrics = tracks[0].prompt;
      }
    }

    return NextResponse.json({
      status,
      audioUrl: status === 'SUCCESS' && tracks?.[0]?.audioUrl ? tracks[0].audioUrl : null,
      title: status === 'SUCCESS' && tracks?.[0]?.title ? tracks[0].title : null,
      lyric: lyrics,
    });

  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
