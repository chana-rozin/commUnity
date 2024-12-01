import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';
import http from "@/services/http";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(req: NextRequest) {
  try {
    const { channel, event, message } = await req.json();

    if (!channel || !event || !message) {
      return NextResponse.json({ success: false, error: 'Invalid input data' }, { status: 400 });
    }

    await pusher.trigger(channel, event, { message });

    const postId = channel.replace("forum-", "");
    const response = await http.patch(`/posts/${postId}`, { message }); // Fix empty arguments

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending Pusher event:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
