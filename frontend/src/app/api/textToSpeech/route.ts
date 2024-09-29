import { NextResponse } from 'next/server';
import { ElevenLabsClient } from 'elevenlabs';
import { v4 as uuid } from 'uuid';
import * as path from 'path';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Call ElevenLabs API to generate audio
    const audioStream = await client.generate({
      voice: 'Grandpa Spuds Oxley',
      model_id: 'eleven_turbo_v2',
      text,
    });

    // Generate unique filename for the audio
    const fileName = `${uuid()}.mp3`;

    // Define the full path for saving the file in the public directory (if using local development)
    const filePath = path.join(process.cwd(), 'public', 'audio', fileName);

    // This part would work in local development, but it's not recommended for production in serverless environments.
    // You might want to use cloud storage like S3 instead.
    if (process.env.NODE_ENV === 'development') {
      const fileStream = require('fs').createWriteStream(filePath);

      // Pipe the audio stream into the file
      audioStream.pipe(fileStream);

      // Wait until the stream is finished writing the file
      await new Promise((resolve, reject) => {
        fileStream.on('finish', resolve);
        fileStream.on('error', reject);
      });

      const audioUrl = `/audio/${fileName}`;
      return NextResponse.json({ url: audioUrl });
    } else {
      // For production, return the audio directly in the response
      /*return new Response(audioStream, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Disposition': `attachment; filename="${fileName}"`,
        },
      });*/
    }

  } catch (error) {
    console.error('Error generating audio:', error);
    return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
  }
}