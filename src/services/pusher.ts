import Pusher from 'pusher-js';

Pusher.logToConsole = true;

export const pusherClient =new Pusher(process.env.PUSHER_KEY || '', {
    cluster: process.env.PUSHER_CLUSTER || ''
}); 