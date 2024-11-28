import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!, 
  key: process.env.PUSHER_KEY!,     
  secret: process.env.PUSHER_SECRET!, 
  cluster: process.env.PUSHER_CLUSTER!, 
  useTLS: true,
});

export async function POST(req: NextRequest) {
  try {
    console.log(req.body);
    const { channel, event, message } = await req.json();
    await pusher.trigger(channel, event, { message });

    return NextResponse.json({ success: true });
  } 
  catch (error) {
    console.error('Error sending Pusher event:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
