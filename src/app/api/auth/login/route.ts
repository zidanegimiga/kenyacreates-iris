import { NextResponse } from 'next/server';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true, token: 'authenticated' });
    }
    
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
