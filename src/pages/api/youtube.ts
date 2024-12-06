import type { APIRoute } from 'astro';

const CHANNEL_URL = 'https://www.youtube.com/@Bbell00_/videos';
const MAX_RESULTS = 5;

export const GET: APIRoute = async ({ request }) => {
  try {
    const response = await fetch(CHANNEL_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch channel page');
    }

    const html = await response.text();
    
    // Extract video information using regex
    const videoPattern = /"videoRenderer":{"videoId":"([^"]+)","thumbnail":{"thumbnails":\[.*?\]},"title":{"runs":\[{"text":"([^"]+)"}.*?"publishedTimeText":{"simpleText":"([^"]+)"}.*?"lengthText":/g;
    
    const videos = [];
    let match;
    let count = 0;

    while ((match = videoPattern.exec(html)) !== null && count < MAX_RESULTS) {
      const [, id, title, publishedAt] = match;
      
      videos.push({
        id,
        title,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        publishedAt,
        description: '' // We can't easily get the description without making additional requests
      });
      
      count++;
    }

    return new Response(JSON.stringify(videos), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Error fetching videos',
        details: import.meta.env.DEV ? `${error}` : undefined
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
