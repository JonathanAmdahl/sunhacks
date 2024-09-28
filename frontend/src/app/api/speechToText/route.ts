import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY
});

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body = await req.json();
        const { audio } = body;

        if (!audio) {
            return NextResponse.json({ error: 'No audio data provided' }, { status: 400 });
        }

        const buffer = Buffer.from(audio, 'base64');
        const tmpDir = path.join(process.cwd(), 'tmp');
        
        // Ensure the tmp directory exists
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }

        const filePath = path.join(tmpDir, 'input.wav');
        
        // Write file synchronously and log the result
        try {
            fs.writeFileSync(filePath, buffer);
            console.log(`File written successfully to ${filePath}`);
        } catch (writeError) {
            console.error('Error writing file:', writeError);
            return NextResponse.json({ error: 'Error writing audio file' }, { status: 500 });
        }

        // Check if file exists after writing
        if (fs.existsSync(filePath)) {
            console.log(`File exists at ${filePath}`);
        } else {
            console.log(`File does not exist at ${filePath}`);
            return NextResponse.json({ error: 'File not created' }, { status: 500 });
        }

        // Use the file path directly in the OpenAI API call
        const data = await openai.audio.transcriptions.create({
            file: fs.createReadStream(filePath),
            model: "whisper-1",
        });

        // Delete the temporary file after processing
        fs.unlinkSync(filePath);

        return NextResponse.json({ transcription: data.text });
    } catch (error) {
        console.error('Error processing audio:', error);
        return NextResponse.json({ error: 'Error processing audio' }, { status: 500 });
    }
}