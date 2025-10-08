import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENT_FILE = path.join(process.cwd(), 'content', 'hero.json');

function ensureContentDir() {
  const dir = path.join(process.cwd(), 'content');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const defaultContent = {
  initialText: {
    image: "/initialText.png",
    alt: "Story"
  },
  textVector: {
    image: "/TextVector.svg",
    alt: "African Storytelling"
  },
  heroImage: {
    image: "/hero.png",
    alt: "African Storytelling"
  },
  paragraph: "Kenya Creates is a storytelling initiative dedicated to reimagining how Kenyan youth talk about their bodies and health. We move beyond legalese and jargon to embrace a language that's deeply personal, relatable, and rooted in our local history.",
  vision: {
    title: "OUR VISION",
    text: "We believe young people deserve to lead conversations about their lives. By shifting the focus from policy-driven rhetoric to authentic, human stories, we center the real emotions of grappling with love, sex, relationships, and body issues from the Kenyan youth perspective. This shift moves the conversation to higher ground.",
    backgroundImage: "/vision.png",
    foregroundImage: "/group.png"
  },
  goal: {
    title: "OUR Goal",
    text: "Kenya Creates is building a bridge between what's unsaid and what needs to be shared. Our goal is simple: ",
    boldText: "to create a culture where health, love, and self-respect are celebrated without judgment.",
    videoUrl: "https://www.youtube.com/watch?v=Gw1OQESCbzw"
  }
};

export async function GET() {
  try {
    ensureContentDir();
    
    if (!fs.existsSync(CONTENT_FILE)) {
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2));
      return NextResponse.json(defaultContent);
    }
    
    const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(defaultContent);
  }
}

export async function POST(request: Request) {
  try {
    const content = await request.json();
    ensureContentDir();
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to save content' }, { status: 500 });
  }
}
