import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// Using a local file to simulate a database for development
const DB_PATH = path.join(process.cwd(), '.progress.json');

// Helper to read DB
function readDb() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading progress DB:", error);
  }
  return { unlocked: ["how-the-web-works"] };
}

// Helper to write DB
function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing progress DB:", error);
  }
}

export async function GET() {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300));
  const data = readDb();
  return NextResponse.json(data);
}

export async function POST(request) {
  try {
    const { slug } = await request.json();
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 500));

    const db = readDb();
    if (!db.unlocked) {
      db.unlocked = ["how-the-web-works"];
    }

    if (!db.unlocked.includes(slug)) {
      db.unlocked.push(slug);
      writeDb(db);
    }

    return NextResponse.json({ success: true, unlocked: db.unlocked });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
