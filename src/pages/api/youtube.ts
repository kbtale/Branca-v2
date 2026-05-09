import type { APIRoute } from 'astro';

const FALLBACK_VIDEOS = [
  {
    id: 'uGDrch8lwEM',
    title: 'Branca Fútbol - Video 1',
    thumbnail: 'https://i.ytimg.com/vi/uGDrch8lwEM/hqdefault.jpg',
    publishedAt: 'Branca Fútbol',
    description: 'Video real de Branca Fútbol.'
  },
  {
    id: '-2cPeC7t7YI',
    title: 'Branca Fútbol - Video 2',
    thumbnail: 'https://i.ytimg.com/vi/-2cPeC7t7YI/hqdefault.jpg',
    publishedAt: 'Branca Fútbol',
    description: 'Video real de Branca Fútbol.'
  },
  {
    id: 'iR28iG8L6gY',
    title: 'Branca Fútbol - Video 3',
    thumbnail: 'https://i.ytimg.com/vi/iR28iG8L6gY/hqdefault.jpg',
    publishedAt: 'Branca Fútbol',
    description: 'Video real de Branca Fútbol.'
  }
];

export const GET: APIRoute = async ({ request }) => {
  try {
    const useLiveData = import.meta.env.YOUTUBE_CHANNEL_URL;

    if (!useLiveData) {
      return new Response(JSON.stringify(FALLBACK_VIDEOS), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300'
        }
      });
    }

    const response = await fetch(import.meta.env.YOUTUBE_CHANNEL_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch channel page');
    }

    const html = await response.text();
    const videoPattern = /"videoRenderer":{"videoId":"([^"]+)","thumbnail":{"thumbnails":\[.*?\]},"title":{"runs":\[{"text":"([^"]+)"}.*?"publishedTimeText":{"simpleText":"([^"]+)"}.*?"lengthText":/g;

    const videos = [];
    let match;

    while ((match = videoPattern.exec(html)) !== null && videos.length < FALLBACK_VIDEOS.length) {
      const [, id, title, publishedAt] = match;

      videos.push({
        id,
        title,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        publishedAt,
        description: ''
      });
    }

    const payload = videos.length > 0 ? videos : FALLBACK_VIDEOS;

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return new Response(
      JSON.stringify(FALLBACK_VIDEOS),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300'
        }
      }
    );
  }
}
